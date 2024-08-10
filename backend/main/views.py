from rest_framework import generics,permissions,pagination,viewsets
import razorpay
from . import serializers
from . import models
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db import IntegrityError, transaction
from django.contrib.auth.hashers import make_password

# Create your views here.
class VendorList(generics.ListCreateAPIView):
    queryset = models.Vendor.objects.all()
    serializer_class = serializers.VendorSerializer
    # permission_classes=[permissions.IsAuthenticated]

    def get_queryset(self):
        qs=super().get_queryset()
        if 'fetch_limit' in self.request.GET:
            limit=int(self.request.GET['fetch_limit'])
            qs=qs[:limit]
        return qs

    

class VendorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Vendor.objects.all()
    serializer_class = serializers.VendorDetailSerializer
    #permission_classes=[permissions.IsAuthenticated]

class VendorProductList(generics.ListAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductListSerializer

    def get_queryset(self):
        qs=super().get_queryset()
        vendor_id=self.kwargs['vendor_id']
        qs=qs.filter(vendor__id=vendor_id).order_by('id')
        return qs

@csrf_exempt
def vendor_register(request):
    first_name = request.POST.get('first_name')
    last_name = request.POST.get('last_name')
    email = request.POST.get('email')
    address = request.POST.get('address')
    mobile = request.POST.get('mobile')
    username = request.POST.get('username')
    password = request.POST.get('password')

    try:
        with transaction.atomic():
            user = User.objects.create_user(
                username=username,
                password=password,
                email=email,
                first_name=first_name,
                last_name=last_name,
            )

            vendor = models.Vendor.objects.create(
                user=user,
                address=address,
                mobile=mobile
            )

            msg = {
                'bool': True,
                'user': user.id,
                'vendor': vendor.id,
                'msg': "Vendor registration created successfully."
            }
    except IntegrityError as e:
        if 'unique constraint' in str(e).lower() and 'username' in str(e).lower():
            msg = {
                'bool': False,
                'msg': "Username already exists."
            }
        elif 'unique constraint' in str(e).lower() and 'mobile' in str(e).lower():
            msg = {
                'bool': False,
                'msg': "Mobile number already exists."
            }
        else:
            msg = {
                'bool': False,
                'msg': "An error occurred while processing your request."
            }

    return JsonResponse(msg)


@csrf_exempt
def vendor_login(request):
    username=request.POST.get('username')
    password=request.POST.get('password')
    user=authenticate(username=username,password=password)
    if user:
        vendor=models.Vendor.objects.get(user=user)
        msg={
            'bool':True,
            'user':user.username,
            'id':vendor.id,
            
        }
    else:
        msg={
            'bool':False,
            'msg':"Invalid username / Password!!!"
        }

    return JsonResponse(msg)

@csrf_exempt
def vendor_change_password(request,vendor_id):
    password=request.POST.get('password')
    vendor=models.Vendor.objects.get(id=vendor_id)
    user=vendor.user
    user.password=make_password(password)
    user.save()
    msg={'bool':True,'msg':'Password changed successfully.'}
    
    return JsonResponse(msg)

class ProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductListSerializer
    pagination_class=pagination.PageNumberPagination

    def get_queryset(self):
        qs=super().get_queryset().order_by('-id')
        if 'category' in self.request.GET:
            category=self.request.GET['category']
            category=models.ProductCategory.objects.get(id=category)
            qs=qs.filter(category=category) 

        if 'fetch_limit' in self.request.GET:
            limit=int(self.request.GET['fetch_limit'])
            qs=qs[:limit]
        return qs

class ProductImgsList(generics.ListCreateAPIView):
    queryset = models.ProductImage.objects.all()
    serializer_class = serializers.ProductImageSerializer

class ProductImgsDetail(generics.ListCreateAPIView):
    queryset = models.ProductImage.objects.all()
    serializer_class = serializers.ProductImageSerializer

    def get_queryset(self):
        qs=super().get_queryset()
        product_id=self.kwargs['product_id']
        qs=qs.filter(product_id=product_id) 
        return qs

class ProductImgDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.ProductImage.objects.all()
    serializer_class = serializers.ProductImageSerializer


class TagProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductListSerializer
    pagination_class=pagination.PageNumberPagination

    def get_queryset(self):
        qs=super().get_queryset()
        tag=self.kwargs['tag']
        qs=qs.filter(tag_icontains=tag) 
        return qs

class RelatedProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductListSerializer
    # pagination_class=pagination.PageNumberPagination

    def get_queryset(self):
        qs=super().get_queryset()
        product_id=self.kwargs['pk']
        product=models.Product.objects.get(id=product_id)
        qs=qs.filter(category=product.category).exclude(id=product_id) 
        return qs

class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductDetailSerializer

#customer

class CustomerList(generics.ListCreateAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerSerializer
    #permission_classes=[permissions.IsAuthenticated]

class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerDetailSerializer
    #permission_classes=[permissions.IsAuthenticated]

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer

@csrf_exempt
def customer_login(request):
    username=request.POST.get('username')
    password=request.POST.get('password')
    user=authenticate(username=username,password=password)
    if user:
        customer=models.Customer.objects.get(user=user)
        msg={
            'bool':True,
            'user':user.username,
            'id':customer.id,
            
        }
    else:
        msg={
            'bool':False,
            'msg':"Invalid username / Password!!!"
        }

    return JsonResponse(msg)

@csrf_exempt
def customer_register(request):
    first_name = request.POST.get('first_name')
    last_name = request.POST.get('last_name')
    email = request.POST.get('email')
    address = request.POST.get('address')
    mobile = request.POST.get('mobile')
    username = request.POST.get('username')
    password = request.POST.get('password')

    try:
        with transaction.atomic():
            user = User.objects.create_user(
                username=username,
                password=password,
                email=email,
                first_name=first_name,
                last_name=last_name,
            )

            customer = models.Customer.objects.create(
                user=user,
                address=address,
                mobile=mobile
            )

            msg = {
                'bool': True,
                'user': user.id,
                'customer': customer.id,
                'msg': "User registration created successfully."
            }
    except IntegrityError as e:
        if 'unique constraint' in str(e).lower() and 'username' in str(e).lower():
            msg = {
                'bool': False,
                'msg': "Username already exists."
            }
        elif 'unique constraint' in str(e).lower() and 'mobile' in str(e).lower():
            msg = {
                'bool': False,
                'msg': "Mobile number already exists."
            }
        else:
            msg = {
                'bool': False,
                'msg': "An error occurred while processing your request."
            }

    return JsonResponse(msg)

@csrf_exempt
def customer_change_password(request,customer_id):
    password=request.POST.get('password')
    customer=models.Customer.objects.get(id=customer_id)
    user=customer.user
    user.password=make_password(password)
    user.save()
    msg={'bool':True,'msg':'Password changed successfully.'}
    
    return JsonResponse(msg)


class OrderList(generics.ListCreateAPIView):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer

class OrderItemList(generics.ListCreateAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderItemSerializer


class CutomerOrderItemList(generics.ListAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderItemSerializer

    def get_queryset(self):
        qs=super().get_queryset()
        customer_id=self.kwargs['pk']
        qs=qs.filter(order__customer__id=customer_id)
        return qs

# fetch venor customer specific orders 
class VendorCustomerOrderItemList(generics.ListAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderItemSerializer

    def get_queryset(self):
        qs=super().get_queryset()
        vendor_id=self.kwargs['vendor_id']
        customer_id=self.kwargs['customer_id']
        qs=qs.filter(order__customer__id=customer_id,product__vendor__id=vendor_id)
        return qs

# vendor specific order list 
class VendorOrderItemList(generics.ListAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderItemSerializer

    def get_queryset(self):
        qs=super().get_queryset()
        vendor_id=self.kwargs['pk']
        qs=qs.filter(product__vendor__id=vendor_id)
        return qs

# show no. of customer od a specific vendor 
class VendorCustomerList(generics.ListAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderItemSerializer

    def get_queryset(self):
        qs=super().get_queryset()
        vendor_id=self.kwargs['pk']
        qs=qs.filter(product__vendor__id=vendor_id)
        return qs

class OrderDetail(generics.ListAPIView):
    # queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderDetailSerializer

    def get_queryset(self):
        order_id=self.kwargs['pk']
        order=models.Order.objects.get(id=order_id)
        order_items=models.OrderItems.objects.filter(order=order)
        return order_items

class OrderDelete(generics.RetrieveDestroyAPIView):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderDetailSerializer


class CustomerAddressViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.CustomerAddressSerializer
    queryset = models.CustomerAddress.objects.all()


class ProductRatingViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ProductRatingSerializer
    queryset = models.ProductRating.objects.all()



# category 
class CategoryList(generics.ListCreateAPIView):
    queryset = models.ProductCategory.objects.all()
    serializer_class = serializers.CategorySerializer
    # permission_classes=[permissions.IsAuthenticated]

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.ProductCategory.objects.all()
    serializer_class = serializers.CategoryDetailSerializer
    #permission_classes=[permissions.IsAuthenticated]

class OrderModify(generics.RetrieveUpdateAPIView):
     queryset = models.Order.objects.all()
     serializer_class = serializers.OrderSerializer

@csrf_exempt
def update_order_status(request, order_id):
    if request.method=='POST':
        updateRes=models.Order.objects.filter(id=order_id).update(order_status=True)
        msg={
            'bool':False,
        }
        if updateRes:
            msg={
                'bool':True,
            }
    return JsonResponse(msg)


class WishList(generics.ListCreateAPIView):
    queryset = models.Wishlist.objects.all()
    serializer_class = serializers.WishlistSerializer

@csrf_exempt
def check_in_wishlist(request):
    if request.method=='POST':
        product_id=request.POST.get('product')
        customer_id=request.POST.get('customer')
        checkWishlist=models.Wishlist.objects.filter(product__id=product_id,customer__id=customer_id).count()
        msg={
            'bool':False
        }
        if checkWishlist>0:
            msg={
                'bool':True
            }
    return JsonResponse(msg)


# delete order of a specific customer 
@csrf_exempt
def delete_customer_orders(request,customer_id):
    if request.method=='DELETE':
        orders=models.Order.objects.filter(customer__id=customer_id).delete()
        msg={
            'bool':False
        }
        if orders:
            msg={
                'bool':True
            }
    return JsonResponse(msg)

# customer wish items 
class CustomerWishItemList(generics.ListAPIView):
    queryset = models.Wishlist.objects.all()
    serializer_class = serializers.WishlistSerializer

    def get_queryset(self):
        qs=super().get_queryset()
        customer_id=self.kwargs['pk']
        qs=qs.filter(customer__id=customer_id)
        return qs

@csrf_exempt
def remove_from_wishlist(request):
    if request.method=='POST':
        wishlist_id=request.POST.get('wishlist_id')
        res=models.Wishlist.objects.filter(id=wishlist_id).delete()
        msg={
            'bool':False
        }
        if res:
            msg={
                'bool':True
            }
    return JsonResponse(msg)


@csrf_exempt
def customer_dashboard(request,pk):
    customer_id=pk
    totalOrders=models.Order.objects.filter(customer__id=customer_id).count()
    totalWishlist=models.Wishlist.objects.filter(customer__id=customer_id).count()
    msg={
        'totalOrders':totalOrders,
        'totalWishlist':totalWishlist
    }
    return JsonResponse(msg)

@csrf_exempt
def vendor_dashboard(request,pk):
    vendor_id=pk
    totalProducts=models.Product.objects.filter(vendor__id=vendor_id).count()
    totalOrders=models.OrderItems.objects.filter(product__vendor__id=vendor_id).count()
    totalCustomers=models.OrderItems.objects.filter(product__vendor__id=vendor_id).values('order__customer').count()
    msg={
        'totalProducts':totalProducts,
        'totalOrders':totalOrders,
        'totalCustomers':totalCustomers,
    }
    return JsonResponse(msg)

@csrf_exempt
def create_razorpay_order(request):
    client = razorpay.Client(auth=("rzp_test_NLnWshpl9etnCv", "OL2Kxg916E4gH77wnKseApck"))

    DATA = {
        "amount": int(request.POST.get('amount')),
        "currency": "INR",
        "receipt": request.POST.get('order_id'),
        "partial_payment":False,
        
    }
    res=client.order.create(data=DATA)

    if res:
        msg={
            'bool':True,
            'data':res
        }
    else:
        msg={
            'bool':False,
        }
    return JsonResponse(msg)


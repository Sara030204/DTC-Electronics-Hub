from django.contrib import admin
from . import models
# Register your models here.

admin.site.register(models.Vendor)
admin.site.register(models.ProductCategory)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['get_username', 'mobile']
    def get_username(self, obj):
        return obj.user.username

admin.site.register(models.Customer,CustomerAdmin)

# admin.site.register(models.Product)

# admin.site.register(models.Customer)

admin.site.register(models.OrderItems)

admin.site.register(models.CustomerAddress)
admin.site.register(models.ProductRating)

admin.site.register(models.ProductImage)

class ProductImagesInline(admin.StackedInline):
    model=models.ProductImage

class ProductAdmin(admin.ModelAdmin):
    prepopulated_fields={'slug': ('title',)}
    inlines=[
        ProductImagesInline,
    ]

admin.site.register(models.Product,ProductAdmin)

class OrderAdmin(admin.ModelAdmin):
    list_display=['id','customer','order_time','order_status']    
admin.site.register(models.Order,OrderAdmin)

class WishlistAdmin(admin.ModelAdmin):
    list_display=['id','product','customer']    
admin.site.register(models.Wishlist,WishlistAdmin)
import { useContext } from 'react';
import { UserContext } from '../Context';
import axios from 'axios';
import { json } from 'react-router-dom';
import { CartContext } from '../Context';
import { useState } from 'react';
import Swal from 'sweetalert2';
import useRazorpay from "react-razorpay";


const url = 'http://127.0.0.1:8000/api';
function ConfirmOrder() {
    const [Razorpay] = useRazorpay();
    const [ConfirmOrder, setConfirmOrder] = useState(false);
    const [OrderId, setOrderId] = useState('');
    const [OrderStatus, setOrderStatus] = useState(false);
    const [OrderAmount,setOrderAmount]=useState(0);
    const [PayMethod, setPayMethod] = useState('');
    const userContext = useContext(UserContext);
    const { cartData, setCartData } = useContext(CartContext);

    if (userContext == null) {
        window.location.href = "/customer/login"
    } else {
        if (ConfirmOrder == false) {
            addOrderInTable();
        }

    }

    function addOrderInTable() {
        const customerId = localStorage.getItem('customer_id');
        const formData = new FormData();
        formData.append('customer', customerId);

        axios.post(url + '/orders/', formData)
            .then(function (response) {
                var orderId = response.data.id;
                setOrderId(orderId);
                orderItems(orderId);
                setConfirmOrder(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    function updateOrderstatus(order_status) {
        console.log(OrderId, order_status);
        axios.post(url + '/update-order-status/' + OrderId)
            .then(function (response) {
                window.location.href = '/order/success';
            })
            .catch(function (error) {
                window.location.href = '/order/failure';
            });
    }

    function orderItems(orderId) {
        var previousCart = localStorage.getItem('cartData');
        var cartJson = JSON.parse(previousCart);

        if (cartJson != null) {
            cartJson.map((cart, index) => {
                const formData = new FormData();
                formData.append("order", orderId);
                formData.append("product", cart.product.id);
                formData.append("qty", 1);
                formData.append("price", cart.product.price);
                const price = formData.get('price');
                setOrderAmount(price);
                axios.post(url + '/orderitems/', formData)
                    .then(function (response) {
                        cartJson.splice(index, 1);
                        localStorage.setItem('cartData', JSON.stringify(cartJson));
                        setCartData(cartJson);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            });
        }

    }
    function changePaymentMethod(paymethod) {
        setPayMethod(paymethod);
    }
    function PayNowButton() {
        if (PayMethod != '') {
            changePaymentMethod(PayMethod);
            if (PayMethod === 'razorpay') {
                razorPayHandler();
            } else if (PayMethod === 'cashondelivery') {
                Swal.fire({
                    icon: "success",
                    title: "Order placed successfully !",
                    showConfirmButton: false,
                    timer: 1500
                }); setOrderStatus(true);
                updateOrderstatus(true)
            }
        } else {
            alert('Please select a payment method first!');
        }
    }

    function razorPayHandler() {
        var razorPayData = new FormData();
        var order_amount=OrderAmount*100;
        razorPayData.append('amount',order_amount);
        razorPayData.append('order_id',OrderId);

            axios.post(url + '/create-razorpay-order/', razorPayData)
            .then(function (response) {
                console.log(response);
                if(response.data.bool==true){
                    const options = {
                        key: 'rzp_test_NLnWshpl9etnCv', // Enter the Key ID generated from the Dashboard
                        amount: order_amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                        currency: "INR",
                        name: "Acme Corp",
                        description: "Test Transaction",
                        image: "https://example.com/your_logo",
                        order_id: response.data.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
                        handler: function (response) {
                        //   alert(response.razorpay_payment_id);
                        //   alert(response.razorpay_order_id);
                        //   alert(response.razorpay_signature);
                        updateOrderstatus(true);
                        window.location.href = '/order/success';
                        },
                        theme: {
                          color: "#3399cc",
                        },
                      };
                    
                      const rzp1 = new Razorpay(options);
                    
                      rzp1.on("payment.failed", function (response) {
                        // alert(response.error.code);
                        // alert(response.error.description);
                        // alert(response.error.source);
                        // alert(response.error.step);
                        // alert(response.error.reason);
                        // alert(response.error.metadata.order_id);
                        // alert(response.error.metadata.payment_id);
                        updateOrderstatus(false);
                      });
                    
                      rzp1.open();
                }
            })
            .catch(function (error) {
                console.log(error);
                    window.location.href = '/order/failure';
            });
    };
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-6 col-lg-6 col-md-6">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="p-3">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4"><i className='fa fa-check-circle text-success'></i> Your order has been confirmed</h1>
                                            <p>Order ID: {OrderId}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="card o-hidden border-0 shadow-lg ">
                        <div className="card-body p-3">
                            <div className="row">
                                <div className="col-lg-111 p-2">
                                    <form>
                                        <div className="form-group ">
                                            <label>
                                                <input type='radio' name='paymentMethod' onChange={() => changePaymentMethod('cashondelivery')} value='cashondelivery' /> Cash On delivery
                                            </label>
                                        </div>
                                        <div className="form-group ">
                                            <label>
                                                <input type='radio' name='paymentMethod' onChange={() => changePaymentMethod('razorpay')} value='razorpay' />
                                                Razorpay
                                            </label>
                                        </div>
                                        <button type='button' onClick={PayNowButton} className='btn btn-sm btn-dark'>Next</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                </div>
            </div>
        </div>
    )
}

export default ConfirmOrder;

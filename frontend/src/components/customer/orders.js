import { Link } from 'react-router-dom';
import './sb-admin-2.css'; 
import { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import axios from 'axios';

function Orders() {
    const url='http://127.0.0.1:8000/api';
    const baseurl='http://127.0.0.1:8000';
    const customerId = localStorage.getItem('customer_id');
    const [OrderItems , setOrderItems] = useState([]);

    useEffect (() =>{
        fetchData(url+'/customer/'+customerId+'/orderitems');
    },[]);

    function fetchData(url){
        fetch(url)
          .then((response)=> response.json())
          .then((data)=> {
             setOrderItems(data.results);
          });
    }

    function cancelOrder(order_id,product_title) {
        console.log(order_id,product_title);
    }

    console.log(OrderItems);
    return (
        <div className="container-fluid">
            <div className="row">
            <div className="col-lg-3">
                    <Sidebar />
                </div>
                
                <div className="col-lg-8">
                    <div className="card shadow mb-4 mt-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">My Orders</h6>
                        </div>
                        <section id="pending">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>Sr.no</th>
                                                <th>Product</th>
                                                <th>price</th>
                                                <th>status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                OrderItems.map((item,index)=>{
                                                    return <tr>
                                                        <td>{index+1}</td>
                                                        <td><Link to={'/product/' + item.product.slug + '/' + item.product.id}>
                                                        <img src={baseurl + '/' + item.product.image} alt={item.product.title} width='60' /></Link>
                                                        <Link to={'/product/' + item.product.slug + '/' + item.product.id}><p>{item.product.title}</p></Link></td>
                                                        <td>Rs. {item.product.price}</td>
                                                        <td>
                                                            <span >
                                                            { 
                                                            item.order.order_status==true && <i className='fa fa-check-circle text-success'>successful</i> 
                                                            }
                                                            { 
                                                            item.order.order_status==false && <i className='fa fa-spinner fa-spin text-dark'>processing</i> 
                                                            }
                                                            
                                                            </span>
                                                        </td>
                                                        <td>
                                                        { 
                                                            item.order.order_status==true && 
                                                            
                                                            <button className='btn btn-primary btn-sm' onClick={() => cancelOrder(item.order.id,item.product.title)}  >cancel order</button>
                                                        }</td>                                
                                                     </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Orders;

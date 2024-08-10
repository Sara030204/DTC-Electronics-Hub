import { Link } from 'react-router-dom';
import './sb-admin-2.css'; 
import Sidebar from './sidebar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
function CustomerOrders() {
    const url='http://127.0.0.1:8000/api';
    const {customer_id}=useParams();
    const [OrderItems , setOrderItems] = useState([]);
    const vendor_id = localStorage.getItem('vendor_id');
    useEffect (() =>{
        fetchData(url+'/vendor/'+vendor_id+'/customer/'+customer_id+'/orderitems'+'/');
    },[]);

    function fetchData(url){
        fetch(url)
          .then((response)=> response.json())
          .then((data)=> {
             setOrderItems(data.results);
          });
    };
    
    function changeOrderStatus(order_id,status){
        fetch(url+'/order-modify/'+order_id+'/',{
            method:'PATCH',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({order_status:status})
        })
        .then(function(response){
            if(response.status==200){
                fetchData(url+'/vendor/'+vendor_id+'/customer/'+customer_id+'/orderitems'+'/');
            }
        })
        
    }
    
    
    return (
        <div className="container-fluid">
            <div className="row">
            <div className="col-lg-3">
                    <Sidebar />
                </div>
                <div className="col-lg-8">
                    <div className="card shadow mb-4 mt-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Orders</h6>
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
                                                OrderItems && OrderItems.map((item,index)=>{
                                                    return <tr>
                                                        <td>{index+1}</td>
                                                        <td><Link><img src={item.product.image} alt="" width='60'/></Link><Link><p>{item.product.title}</p></Link></td>
                                                        <td>&#8377; {item.product.price}</td>
                                                        
                                                        <td>
                                                            {
                                                                item.order.order_status && <span className='text-success'><i className='fa fa-check-circle'></i> {item.product.status}Completed</span>
                                                            }
                                                            {
                                                                !item.order.order_status && <span className='text-warning'><i className='fa fa-spinner fa-spin'></i> {item.product.status}Processing</span>
                                                            }
                                                        </td>
                                                        <td>
                                                        <div className="dropdown">
                                                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                Change status
                                                            </button>
                                                            <ul className="dropdown-menu">
                                                                <li>
                                                                    {
                                                                        !item.order.order_status && <a className="dropdown-item" onClick={()=>changeOrderStatus(item.order.id,true)} href="#">Complete</a>
                                                                    }
                                                                    {
                                                                        item.order.order_status && <a className="dropdown-item" onClick={()=>changeOrderStatus(item.order.id,false)} href="#">Processing</a>
                                                                    }
                                                                </li>
                                                                <li></li>
                                                            </ul>
                                                        </div>
                                                        </td>
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

export default CustomerOrders;

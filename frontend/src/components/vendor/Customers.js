import { Link } from 'react-router-dom';
import './sb-admin-2.css'; 
import Sidebar from './sidebar';
import { useState, useEffect } from 'react';


function Customers() {

    const url='http://127.0.0.1:8000/api';
    const [CustomerList , setCustomerList] = useState([]);
    const vendor_id = localStorage.getItem('vendor_id');

    useEffect (() =>{
        fetchData(url+'/vendor/'+vendor_id+'/customers/');
    },[]);

    function fetchData(url){
        fetch(url)
          .then((response)=> response.json())
          .then((data)=> {
             setCustomerList(data.results);
          });
    };
    
    function showConfirm(customer_id){
        var _confirm= window.confirm('Are you sure to delete this order..?');
        if(_confirm){
            fetch(url+'/delete-customer-orders/'+customer_id+'/',{
                method:'DELETE'
            })
          .then((response)=>{
            if(response.bool==true){
                fetchData(url+'/vendor/customer/'+customer_id+'/orderitems/');
            }
          });
        }
        
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
                            <h6 className="m-0 font-weight-bold text-primary">My customers list </h6>
                        </div>
                        <section id="pending">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>Sr.no</th>
                                                <th>Name</th>
                                                <th>email</th>
                                                <th>contact</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                CustomerList.map((item,index)=><tr>
                                                <td>1</td>
                                                <td>{item.user.username}</td>                                  
                                                <td>{item.user.email}</td>
                                                <td>{item.customer.mobile}</td>
                                                <td><Link to={'/vendor/customer/'+item.customer.id+'/orderitems/'} className='btn btn-primary btn-sm'>Orders</Link></td>                                
                                                <td><button onClick={()=>showConfirm(item.customer.id)} className='btn btn-danger btn-sm'>Remove form list</button></td>                                
                                            </tr>
                                                    )
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

export default Customers;

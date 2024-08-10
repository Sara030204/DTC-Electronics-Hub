import Sidebar from './sidebar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard(props) {
    const url='http://127.0.0.1:8000/api';
    const customerId = localStorage.getItem('customer_id');
    const [CountList , setCountList] = useState({
        'totalOrders':0,
        'totalWishlist':0
    });

    useEffect (() =>{
        fetchData(url+'/customer/dashboard/'+customerId+'/');
    },[]);

    function fetchData(url){
        fetch(url)
          .then((response)=> response.json())
          .then((data)=> {
             setCountList({
                'totalOrders':data.totalOrders,
                'totalWishlist':data.totalWishlist,
             })
          });
    }

    return (
        <div className='container-fluid border'>
            <div className='row'>
                <div className='col-md-3 col-12 mb-2'>
                    <Sidebar />
                </div>
                <div className="col-md-9 col-12 mb-2">
                    <div className="row mt-5">
                        <div className="col-xl-4 col-md-6 mb-4 ms-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Total Orders
                                            </div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                            <Link to="/customer/orders" className='nav-link'>
                                                {CountList.totalOrders}
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                       
                                            <i className="fas fa-shopping-cart fa-2x text-gray-300"></i>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-6 mb-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Total Wishlist
                                            </div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                            <Link to="/customer/wishlist" className='nav-link'>
                                               {CountList.totalWishlist}
                                               </Link>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-heart fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

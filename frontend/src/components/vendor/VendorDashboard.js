import { Link } from 'react-router-dom';
import Sidebar from './sidebar';
import "./sb-admin-2.css";
import { useState, useEffect } from 'react';

function VendorDashboard() {
    const url='http://127.0.0.1:8000/api';
    const vendorId = localStorage.getItem('vendor_id');
    const [VendorData , setVendorData] = useState({
        'totalProducts':0,
        'totalOrders':0,
        'totalCustomers':0,
    });

    function fetchData(url){
        fetch(url)
          .then((response)=> response.json())
          .then((data)=> {
             setVendorData(data);
          });
    }

    fetchData(url+'/vendor/'+vendorId+'/dashboard');
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 col-12 p-0">
                    <Sidebar />
                </div>
                <div className="col-md-9 col-12 ">
                    <div className="row mt-5">
                        <div className="col-xl-4 col-md-6 mb-4 ms-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Total Products
                                            </div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                
                                                <Link to="/vendor/products" className='nav-link'>
                                                {VendorData.totalProducts}
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-box fa-2x text-gray-300"></i>
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
                                                Total Orders
                                            </div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                            
                                            <Link to="/vendor/orders" className='nav-link'>
                                            {VendorData.totalOrders}
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
                        <div className="col-xl-4 col-md-6 mb-4 ms-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Total Customers
                                            </div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                            
                                            <Link to="/vendor/customers" className='nav-link'>
                                            {VendorData.totalCustomers}
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fa fa-users fa-2x text-gray-300"></i>
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

export default VendorDashboard;

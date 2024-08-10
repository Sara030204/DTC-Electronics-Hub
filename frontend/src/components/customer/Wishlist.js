import { Link } from 'react-router-dom';
import './sb-admin-2.css';
import Sidebar from './sidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Wishlist() {
    const url = 'http://127.0.0.1:8000/api';
    const customerId = localStorage.getItem('customer_id');
    const [WishItems, setWishItems] = useState([]);

    useEffect(() => {
        fetchData(url + '/customer/' + customerId + '/wishitems');
    }, []);

    function fetchData(url) {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setWishItems(data.results);
            });
    };

    console.log(WishItems);

    // wishlist
    function removeFromWishList(wishlist_id) {
        const formData = new FormData();
        formData.append("wishlist_id", wishlist_id);

        axios.post(url + '/remove-from-wishlist/', formData)
            .then(function (response) {
                if (response.data.bool==true) {
                    document.getElementById('row'+wishlist_id).remove();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

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
                                <div className="table-responsive text-center">
                                    <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>Sr.no</th>
                                                <th>Product</th>
                                                <th>Price</th>

                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                WishItems.map((item, index) => {
                                                    console.log(item.product.image);
                                                    return <tr id={'row' + item.id}>
                                                        <td>{index + 1}.</td>
                                                        {/* <td><Link><img src={item.product.image} alt={item.product.title} width='60' /></Link></td> */}
                                                        <td><Link>{item.product.title}</Link></td>
                                                        <td>&#8377; {item.product.price}</td>
                                                        <td><button className='btn btn-primary btn-sm' onClick={() => removeFromWishList(item.id)}>Remove</button></td>
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

export default Wishlist;

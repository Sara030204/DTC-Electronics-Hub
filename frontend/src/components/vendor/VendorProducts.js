import { Link } from 'react-router-dom';
import Sidebar from './sidebar';
import "./sb-admin-2.css";
import { useState ,useEffect} from 'react';

function VendorProducts() {
    const url='http://127.0.0.1:8000/api';
    const [ProductData, setProductData] = useState([]);
    const vendorId = localStorage.getItem("vendor_id"); 
    useEffect (() =>{
        fetchData(url+'/vendor-products/'+vendorId);
    },[]);

    function fetchData(url){
        fetch(url)
          .then((response)=> response.json())
          .then((data)=> {
            setProductData(data.results);
          });
    };
    
    function showConfirm(product_id){
        var _confirm= window.confirm('Are you sure to delete this product..?');
        if(_confirm){
            fetch(url+'/product/'+product_id+'/',{
                method:'DELETE'
            })
          .then((response)=>{
            if(response.status==204){
                fetchData(url+'/products/');
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
                    <div className="container-fluid">
                        <div className="card shadow mb-4 mt-4">
                            <div className="card-header py-3">
                                <Link to='/vendor/addproduct'><button type="button" className="btn btn-primary" ><i class="fa-solid fa-circle-plus"></i>
                                   Add Product
                                </button></Link>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>Sr.No.</th>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { ProductData.map((product,index)=><tr>
                                                <td>{index+1}</td>
                                                <td><Link to={'/vendor/update-product/'+product.id} > {product.title}</Link></td>
                                                <td>&#8377;{product.price}</td>
                                                <td>
                                                    <Link to={'/vendor/update-product/'+product.id} className="btn btn-warning btn-sm ms-2">EDIT</Link>
                                                    <Link href={'/vendor/delete-product/'+product.id} onClick={()=>showConfirm(product.id)} className="btn btn-danger btn-sm ms-2">DELETE</Link>
                                                </td>
                                            </tr>
                                        )}
                                          </tbody>  
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VendorProducts;

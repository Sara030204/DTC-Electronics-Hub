import Sidebar from './sidebar';
import { useState, useEffect } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';

function AddProduct(props) {
    const url = 'http://127.0.0.1:8000/api';
    const vendor_id = localStorage.getItem('vendor_id');
    const [CategoryData, setCategoryData] = useState([]);
    const [errorMsg, seterrorMsg] = useState("");
    const [successMsg, setsuccessMsg] = useState("");

    const [ProductData, setProductData] = useState({
        'vendor': vendor_id,
        'category': '',
        'title': '',
        'slug': '',
        'detail': '',
        'price': '',
        'tags': '',
        'image': '',

    });

    const [ProductImgs, setProductImgs] = useState([]);
    const [ImgUploadErrorMsg, setImgUploadErrorMsg] = useState("");
    const [ImgUploadSuccessMsg, setImgUploadSuccessMsg] = useState("");

    const inputHandler = (e) => {
        setProductData({
            ...ProductData,
            [e.target.name]: e.target.value
        });
    };

    const fileHandler = (e) => {
        setProductData({
            ...ProductData,
            [e.target.name]: e.target.files[0]
        });
    };

    useEffect(() => {
        fetchData(url + '/categories/');
    }, []);

    function fetchData(url) {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setCategoryData(data.results);
            });
    };

    const multipleFilesHandler = (e) => {
        var files = e.target.files;
        if (files.length > 0) {
            setProductImgs(files);
        }
    };

    const submitHandler = (event) => {
        console.log(ProductData);
        const formData = new FormData();
        formData.append('vendor', ProductData.vendor);
        formData.append('category', ProductData.category);
        formData.append('title', ProductData.title);
        formData.append('slug', ProductData.slug);
        formData.append('detail', ProductData.detail);
        formData.append('price', ProductData.price);
        formData.append('tags', ProductData.tags);
        formData.append('image', ProductData.image);


        axios.post(url + '/products/', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(function (response) {
                if (response.status == 201) {
                    setProductData({
                        'vendor': vendor_id,
                        'category': '',
                        'title': '',
                        'slug': '',
                        'detail': '',
                        'price': '',
                        'tags': '',
                        'image': '',

                    });
                    seterrorMsg('');
                    setsuccessMsg(response.statusText);
                    
                    Swal.fire({
                        title: "success",
                        text: "Product Added successfully !!",
                        icon: "success",
                        
                      });
                        

                    for (let i=0;i<ProductImgs.length;i++) {
                         // set multiple image data 
                        const ImageFormData = new FormData();
                        ImageFormData.append('product',response.data.id);
                        ImageFormData.append('image',ProductImgs[i]);
                        axios.post(url + '/product-imgs/', ImageFormData)
                            .then(function (response) {
                                console.log(response);
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                        // end mul img data
                    }
                   
                    setProductImgs('');
                } else {
                    seterrorMsg('');
                    setsuccessMsg('Invalid data');
                    Swal.fire({
                        title: "Oops..",
                        text: "Invalid data!!",
                        icon: "warning",
                        
                      });
                }
            })
            .catch(function (error) {
                Swal.fire({
                    title: "Oops..",
                    text: "Something went wrong!!",
                    icon: "error",
                    
                  });
            });

    };



    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-7" style={{ padding: '5px' }}>
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Add Product!</h1>
                                        </div>
                                        <form className="user">
                                            
                                            <div className="form-group mt-4">
                                                <select className='form-control' name='category' id='category' onChange={inputHandler}>
                                                    {CategoryData.map((item, index) => <option value={item.id}>{item.title}</option>)}
                                                </select>
                                            </div>
                                            <div className="form-group mt-4">
                                                <input type="text" className="form-control form-control-user"
                                                    placeholder="Enter title" name="title" id="title" onChange={inputHandler} value={ProductData.title} required style={{ borderRadius: 0 }} />
                                            </div>
                                            <div className="form-group mt-4">
                                                <input type="text" className="form-control form-control-user"
                                                    placeholder="Enter slug" name="slug" id="slug" onChange={inputHandler} value={ProductData.slug} required style={{ borderRadius: 0 }} />
                                            </div>
                                            <div className="form-group mt-4">
                                                <textarea type="description" className="form-control form-control-user rows-5" onChange={inputHandler} value={ProductData.detail}
                                                    placeholder="Enter description" name="detail" id="detail" required style={{ borderRadius: 0 }}></textarea>
                                            </div>

                                            <div className="form-group mt-4">
                                                <input type="number" className="form-control form-control-user"
                                                    name="price" id="price" onChange={inputHandler} value={ProductData.price}
                                                    placeholder="Enter price" required style={{ borderRadius: 0 }} />
                                            </div>
                                            <div className="form-group mt-4">
                                                <input type="text" className="form-control form-control-user"
                                                    placeholder="Enter tags" name="tags" id="tags" onChange={inputHandler} value={ProductData.tags} required style={{ borderRadius: 0 }} />
                                            </div>
                                            <div className="form-group mt-4">
                                                <input type="file" className="form-control form-control-user"
                                                    placeholder="Select featured images" name="image" id="image" onChange={fileHandler} required style={{ borderRadius: 0 }} />
                                            </div>
                                            <div className="form-group mt-4">
                                                <input type="file" className="form-control form-control-user"
                                                    placeholder="Select images" multiple name="product_imgs" id="product_imgs" onChange={multipleFilesHandler} required style={{ borderRadius: 0 }} />
                                            </div>
                                            <div className="text-center">
                                                <button type="button" name="addproduct" onClick={submitHandler} className="btn btn-dark btn-user btn-block mt-3" >Add Product</button>
                                            </div>
                                        </form>
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

export default AddProduct;

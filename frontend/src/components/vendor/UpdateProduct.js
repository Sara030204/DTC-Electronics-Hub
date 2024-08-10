import Sidebar from './sidebar';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function UpdateProduct(props) {
    const url = 'http://127.0.0.1:8000/api';
    const { product_id } = useParams();
    const vendor_id = localStorage.getItem('vendor_id');
    const [CategoryData, setCategoryData] = useState([]);
    const [errorMsg, seterrorMsg] = useState("");
    const [successMsg, setsuccessMsg] = useState("");
    const [IsFeaturedImageSelected, setIsFeaturedImageSelected] = useState(false);
    const [IsImageDeleted, setIsImageDeleted] = useState(false);
    const [IsMultipleImageSelected, setIsMultipleImageSelected] = useState(false);

    const [ProductData, setProductData] = useState({
        'vendor': vendor_id,
        'category': '',
        'title': '',
        'slug': '',
        'detail': '',
        'price': '',
        'tags': '',
        'image': '',
        'product_imgs': '',

    });

    const [ProductImgs, setProductImgs] = useState([]);

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

        if (e.target.name === "image") {
            setIsFeaturedImageSelected(true);
        }
    };

    const multipleFilesHandler = (e) => {
        var files = e.target.files;
        if (files.length > 0) {
            setIsMultipleImageSelected(true);
            setProductImgs(files);
        };
        
    };

    const submitHandler = () => {
        const formData = new FormData();
        formData.append('vendor', ProductData.vendor);
        formData.append('category', ProductData.category);
        formData.append('title', ProductData.title);
        formData.append('slug', ProductData.slug);
        formData.append('detail', ProductData.detail);
        formData.append('price', ProductData.price);
        formData.append('tags', ProductData.tags);

        if(IsFeaturedImageSelected){
            formData.append('image', ProductData.image);
        }

        axios.patch(url + '/product/' + product_id + '/', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(function (response) {
                if (response.status == 200) {
                    seterrorMsg('');
                    setsuccessMsg(response.statusText);
                    if(!IsMultipleImageSelected){
                    Swal.fire({
                        title: "success",
                        text: "Product updated successfully !!",
                        icon: "success",
                        
                      });
                    }

                    if(IsMultipleImageSelected){
                        for (let i = 0; i < ProductImgs.length; i++) {
                            // set multiple image data 
                            const ImageFormData = new FormData();
                            ImageFormData.append('product', response.data.id);
                            ImageFormData.append('image', ProductImgs[i]);
                            axios.post(url + '/product-imgs/', ImageFormData)
                                .then(function (response) {
                                    console.log(response);
                                    window.location.reload();
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                            // end mul img data
                        }

                        
                    }

                    
                } else {
                    seterrorMsg('');
                    setsuccessMsg('Invalid data');
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    useEffect(() => {
        fetchData(url + '/categories/');
        fetchProductData(url + '/product/' + product_id);
    }, []);

    function fetchData(url) {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setCategoryData(data.results);
            });
    };

    function deleteImage(image_id){
        axios.delete(url + '/product-img/' + image_id + '/')
            .then(function (response) {
                if(response.status==204){
                    window.location.reload();
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    function fetchProductData(url) {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setProductData({
                    'vendor': vendor_id,
                    'category': data.category,
                    'title': data.title,
                    'slug': data.slug,
                    'detail': data.detail,
                    'price': data.price,
                    'tags': data.tags,
                    'image': data.image,
                    'product_imgs': data.product_imgs,
                })
            });
    };

    console.log("data", ProductData);

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
                                            <h1 className="h4 text-gray-900 mb-4">Update Product!</h1>
                                        </div>
                                        <form className="user">
                                            <div className="form-group mt-4">
                                                <select className='form-control' name='category' id='category' onChange={inputHandler}>
                                                    {CategoryData.map((item, index) =>
                                                        <option selected={item.id == ProductData.category} value={item.id}>{item.title}</option>
                                                    )}
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
                                                     name="image" id="image" onChange={fileHandler} required style={{ borderRadius: 0 }} />
                                                <img src={ProductData.image} alt='image' className='img rounded  mt-2' width='200' />
                                            </div>
                                            <div className="form-group mt-4">
                                                <input type="file" className="form-control form-control-user mb-4"
                                                     multiple name="product_imgs" id="product_imgs" onChange={multipleFilesHandler} required style={{ borderRadius: 0 }} />
                                                {ProductData.product_imgs && ProductData.product_imgs.map((img, index) => 
                                                <span className='image-box d-inline p-3' onClick={()=>deleteImage(img.id)}>
                                                    <i className='fa fa-trash text-danger ' style={styles.deleteBtn} role='button' ></i>
                                                    <img src={img.image} alt='image' className=' my-5' width='120' />
                                                </span>
                                                )}
                                            </div>
                                            <div className="text-center">
                                                <button type="button" name="addproduct" onClick={submitHandler} className="btn btn-dark btn-user btn-block mt-3" >Update Product</button>
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

const styles={
    'deleteBtn':{
        'position':'absolute',
    }

}

export default UpdateProduct;

import { Link} from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import SingleRelatedProduct from './SingleRelatedProduct';
import { CartContext } from '../Context';
import { UserContext } from '../Context';
import axios from 'axios';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

function ProductDetail() {
    const url = 'http://127.0.0.1:8000/api';
    const [productData, setproductData] = useState([]);
    const [productImgs, setproductImgs] = useState([]);
    const [productTags, setproductTags] = useState([]);
    const [relatedProducts, setrelatedProducts] = useState([]);
    const { product_slug, product_id } = useParams();
    const [cartButtonClickStatus, setcartButtonClickStatus] = useState(false);
    const [ProductInWishlist, setProductInWishlist] = useState(false);
    const {cartData,setCartData}=useContext(CartContext);
    const userContext = useContext(UserContext);

    useEffect(() => {
        fetchData(url + '/product/' + product_id);
        fetchRelatedData(url + '/related-products/' + product_id);
        checkProductInCart(product_id);
        checkProductInWishList(url + '/check-in-wishlist/', product_id);
    }, []);

 

    function checkProductInCart(product_id){
        var previousCart=localStorage.getItem('cartData');
        var cartJson=JSON.parse(previousCart);
        if (cartJson!=null){
            cartJson.map((cart)=>{
                if(cart!=null && cart.product.id == product_id){
                    setcartButtonClickStatus(true);
                }
            });
        }
        
    }

    function fetchData(url) {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setproductData(data);
                setproductImgs(data.product_imgs);
                setproductTags(data.tag_list);
            });
    }

    function fetchRelatedData(url) {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setrelatedProducts(data.results);

            });
    }

    const tagsLinks = []
    for (let i = 0; i < productTags.length; i++) {
        let tag = productTags[i].trim();
        tagsLinks.push(<Link className='badge bg-secondary text-white me-1' to={'/products/' + { tag }}>{tag}</Link>)
    }
    
    // add to cart handler 
    const cartAddButtonHandler = () => {
        var previousCart=localStorage.getItem('cartData');
        var cartJson=JSON.parse(previousCart);
        var cartData={
                'product':{
                    'id':productData.id,
                    'title':productData.title,
                    'price':productData.price,
                    'image':productData.image,
                },
                'user':{
                    'id':1
                }
        }
        
        if(cartJson!=null){
            cartJson.push(cartData);
            var cartString=JSON.stringify(cartJson);
            localStorage.setItem('cartData',cartString);
            setCartData(cartJson);
        }else{
            var newCartList=[];
            newCartList.push(cartData);
            var cartString=JSON.stringify(newCartList);
            localStorage.setItem('cartData',cartString);
        }
        
        setcartButtonClickStatus(true);
    }

    const cartRemoveButtonHandler = () => {
        var previousCart=localStorage.getItem('cartData');
        var cartJson=JSON.parse(previousCart);
        cartJson.map((cart,index)=>{
            if(cart!=null && cart.product.id == productData.id){
                // delete cartJson[index];
                cartJson.splice(index,1);
            }
        });
        var cartString=JSON.stringify(cartJson);
        localStorage.setItem('cartData',cartString);
        setcartButtonClickStatus(false);
        setCartData(cartJson);
    }

    // wishlist
    function saveInWishList(){
        const customerId = localStorage.getItem('customer_id');
        const formData = new FormData();
        formData.append("customer", customerId);
        formData.append("product", productData.id);

        axios.post(url + '/wishlist/', formData)
            .then(function (response) {
               if(response.data.id){
                setProductInWishlist(true);
               }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //check in wishlist
    function checkProductInWishList(baseUrl,product_id) {
        const customerId = localStorage.getItem('customer_id');
        const formData = new FormData();
        formData.append("customer", customerId);
        formData.append("product", product_id);

        axios.post(baseUrl, formData)
            .then(function (response) {
               if(response.data.bool==true){
                    setProductInWishlist(true);
               }else{
                setProductInWishlist(false);
               }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (

        <section className="container mt-4">
            <div className="row">
                <div className="col-4">

                    <div id="ProductThumbnailSlider" className="carousel slide carousel-dark border carousel-fade" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            {productImgs.map((img, index) => {
                                if (index === 0) {
                                    return <button type="button" data-bs-target="#ProductThumbnailSlider"
                                        data-bs-slide-to={index} className="active" aria-current="true" aria-label="Slide 1"></button>

                                } else {
                                    return <button type="button" data-bs-target="#ProductThumbnailSlider"
                                        data-bs-slide-to={index} aria-current="true" aria-label="Slide 1">
                                    </button>

                                }
                            })}
                        </div>
                        <div className="carousel-inner">
                            {productImgs.map((img, index) => {
                                if (index == 0) {
                                    return <div className="carousel-item active">
                                        <div className='row mb-4'>
                                            <img src={img.image} className=" image-thumbnail mb-5" alt={index} />
                                        </div>
                                    </div>
                                } else {
                                    return <div className="carousel-item ">
                                        <div className='row mb-4'>
                                            <img src={img.image} className=" image-thumbnail mb-5" alt={index} />
                                        </div>
                                    </div>
                                }
                            })}

                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#ProductThumbnailSlider" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#ProductThumbnailSlider" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>


                    </div>
                </div>
                <div className="col-8">
                    <h3>Title : {productData.title}</h3>
                    <p>Detail : {productData.detail}</p>
                    <h5 className="card-title">Price : &#8377;{productData.price}</h5>
                    <p className='mt-3'>
                        {!cartButtonClickStatus &&
                        <button title="Add to Cart" type="button" onClick={cartAddButtonHandler} className='btn btn-primary'>
                            <i className="fa-solid fa-cart-plus"></i> Add to Cart
                        </button>
                         }
                         {cartButtonClickStatus &&
                        <button title="Remove form Cart" type="button" onClick={cartRemoveButtonHandler} className='btn btn-warning'>
                            <i className="fa-solid fa-cart-plus"></i> Remove from  Cart
                        </button>
                         }
                        <button title="buy Now" className='btn btn-success ms-1'>
                            <i className="fa-solid fa-bag-shopping"></i> Buy Now
                        </button>
                        {
                            (userContext && !ProductInWishlist) && <button title="Add to Wishlist" onClick={saveInWishList} className='btn btn-danger ms-1'><i
                            className="fa fa-heart"></i> Wishlist</button>
                        }
                        {
                            userContext==null && <button title="Add to Wishlist" className='btn btn-danger ms-1 disabled'><i
                            className="fa fa-heart"></i> Wishlist</button>
                        }
                        {
                             (userContext && ProductInWishlist) && <button title="Add to Wishlist" className='btn btn-danger ms-1 disabled'><i
                            className="fa fa-heart"></i> Wishlist</button>
                        }
                        
                    </p>
                    <div className='producttags mt-5'>
                        <h5>Tags</h5>
                        <p>
                            {tagsLinks}
                        </p>

                    </div>
                </div>
            </div>

            {/* related products */}
            {relatedProducts.length > 0 &&
            <>
            <h3 className='mt-3 text-center'>Related products</h3>
            <OwlCarousel className='owl-theme' items={5}  margin={10}>
                {relatedProducts.map((product, index) => {
                return <div key={product.id} className='item'>
                        <SingleRelatedProduct product={product} />
                    </div>
                })}
            </OwlCarousel>
            </>   
            }
            {/* end related products */}
        </section>
    );
}
export default ProductDetail;
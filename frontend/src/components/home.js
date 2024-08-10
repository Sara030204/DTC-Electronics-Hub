import React, { useState, useEffect } from 'react';
import SingleProduct from './SingleProduct';
import SingleSeller from './vendor/SingleSeller';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

function Home() {
    const url = 'http://127.0.0.1:8000/api';
    const [products, setProducts] = useState([]);
    const [Vendors, setVendors] = useState([]);
    const [categories, setCategories] = useState([]);
        
  const imgStyle = {
    width: '100%',
    height: '17vw',
    objectFit: 'contain',
  };

    useEffect(() => {
        fetchData(url + '/products/?fetch_limit=4');
        fetchPopularVendors(url + '/vendors/?fetch_limit=4');
        fetchPopularCategories(url + '/categories?fetch_limit=4');
    }, []);

    function fetchData(url) {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.results);
            });
    }

    function fetchPopularVendors(url) {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setVendors(data.results);
            });
    }

    function fetchPopularCategories(url) {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setCategories(data.results);
            });
    }

    return (
        <main className='mt-0 mb-5'>
            <section className="banner set-bg" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/img/banner/bg.jpg)`}}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-7 col-lg-8 m-auto">
                            <OwlCarousel className="banner__slider owl-carousel" loop margin={10} nav={false} items={1} autoplay autoplayTimeout={5000} autoplayHoverPause dots>
                                <div className="banner__item">
                                  <div className="banner__text">
                                  <span>Latest Electronics</span>
                                  <h1>Explore Our Newest Devices</h1>
                                  <p>Discover the latest technology in smartphones, laptops, and more. Stay ahead with cutting-edge gadgets.</p>
                                  <Link to={'/'} className='Link'>Shop now</Link>
                                  </div>
                                </div>
                                <div className="banner__item">
                                    <div className="banner__text">
                                    <span>Latest Electronics</span>
                                  <h1>Explore Our Newest Devices</h1>
                                  <p>Discover the latest technology in smartphones, laptops, and more. Stay ahead with cutting-edge gadgets.</p>
                                  <Link to={'/'} className='Link'>Shop now</Link>
                                    </div>
                                </div>
                                <div className="banner__item">
                                    <div className="banner__text">
                                    <span>Latest Electronics</span>
                                  <h1>Explore Our Newest Devices</h1>
                                  <p>Discover the latest technology in smartphones, laptops, and more. Stay ahead with cutting-edge gadgets.</p>
                                  <Link to={'/'} className='Link'>Shop now</Link>
                                    </div>
                                </div>
                            </OwlCarousel>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container ">
                <div></div>
                <h3 className='mb-3 mt-4' style={{color: '#333'}}> LATEST PRODUCT <Link to='/products' className='float-end btn btn-sm btn-dark m-2'>View all products <i className="fa-solid fa-arrow-right-long"></i></Link></h3>
                <div className='row'>
                    {products.map((product) =>
                        <SingleProduct key={product.id} product={product} />
                    )}
                </div>

                <h3 className='mb-3 mt-4' style={{color: '#333'}}>POPULAR CATEGORIES <Link to='/categories' className='float-end btn btn-sm btn-dark m-2'>View all categories <i className="fa-solid fa-arrow-right-long"></i></Link></h3>
                <div className='row mt-1'>
                    {categories && categories.map((category) =>
                        <div className='col-12 col-md-3' key={category.id}>
                            <section className="mx-auto my-4" style={{ maxWidth: '20rem' }}>
                                <div className="card" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
                                    <div className="bg-image hover-overlay ripple rounded-1" style={imgStyle} data-mdb-ripple-color="light">
                                        <img className="img-fluid" src={category.cat_img} alt={category.title} />
                                        <a href="#!">
                                            <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                                        </a>
                                    </div>
                                    <div className="card-body">
                                        <div>
                                            <h5 className="card-title font-weight-bold mb-1">
                                                <Link to={'/category/'+category.title+'/'+category.id}>{category.title}</Link>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}
                </div>



                {/* end popular categories */}

                {/* popular vendors */}
                <h3 className='mb-2 mt-2' style={{color: '#333'}}>POPULAR VENDORS <Link to='/vendors' className='float-end btn btn-sm btn-dark m-2'>View all Vendor <i className="fa-solid fa-arrow-right-long"></i></Link></h3>
                <div className='row mt-1'>
                    {Vendors.map((vendor) =>
                        <SingleSeller key={vendor.id} vendor={vendor} />
                    )}
                </div>

                {/* review and rating box */}
                <div id="carouselExampleIndicators" className="carousel slide my-4 border bg-dark text-white p-5" data-bs-ride="true">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <figure className="text-center">
                                <blockquote className="blockquote">
                                    <p>Sleek design, packed with features, and great battery lifet.</p>
                                </blockquote>
                                <figcaption className="blockquote-footer">
                                    <i className='fa fa-star text-warning'></i>
                                    <cite title="Source Title">Veda1234</cite>
                                </figcaption>
                            </figure>
                        </div>
                        <div className="carousel-item">
                            <figure className="text-center">
                                <blockquote className="blockquote">
                                    <p> "Exceptional sound quality, comfortable fit, and long-lasting battery."</p>
                                </blockquote>
                                <figcaption className="blockquote-footer">
                                    <i className='fa fa-star text-warning'></i>
                                    <cite title="Source Title">Sara1234</cite>
                                </figcaption>
                            </figure>
                        </div>
                        <div className="carousel-item">
                            <figure className="text-center">
                                <blockquote className="blockquote">
                                    <p>"Stunning picture quality, seamless smart features, and immersive sound."</p>
                                </blockquote>
                                <figcaption className="blockquote-footer">
                                    <i className='fa fa-star text-warning'></i>
                                    <cite title="Source Title">sara1234</cite>
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                {/* end of review and rating box */}
            </div>
        </main>
    );
}

export default Home;

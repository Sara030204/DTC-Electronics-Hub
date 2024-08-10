

import {Link} from 'react-router-dom';

function Footer() {
    return (
       
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-7">
                            <div className="footer__about">
                                <div className="footer__logo">
                                    <Link to={'/'}><img src="/logo.png" alt="Gadget Galaxy" style={{height:50}} /></Link>
                                </div>
                                <p>One-stop destination for the latest tech gadgets, offering a wide range of products and accessories to enhance your digital lifestyle.</p>
                                {/* <div className="footer__payment">
                                    <a href="#"><img src="img/payment/payment-1.png" alt="" /></a>
                                    <a href="#"><img src="img/payment/payment-2.png" alt="" /></a>
                                    <a href="#"><img src="img/payment/payment-3.png" alt="" /></a>
                                    <a href="#"><img src="img/payment/payment-4.png" alt="" /></a>
                                    <a href="#"><img src="img/payment/payment-5.png" alt="" /></a>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-5">
                            <div className="footer__widget">
                                <h6>Quick links</h6>
                                <ul>
                                    
                                    
                                    
                                    
                                    <li><Link to={'/'}>Home</Link></li>
                                    <li><Link to={'/categories'}>Categories</Link></li>
                                    <li><Link to={'/products'}>Products</Link></li>
                                    <li><Link to={'/contact'}>Contact</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4">
                            <div className="footer__widget">
                                <h6>Account</h6>
                                <ul>
                                    <li><a href="#">My Account</a></li>
                                    <li><a href="#">Checkout</a></li>
                                    <li><a href="#">Wishlist</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-8 col-sm-8">
                            <div className="footer__newslatter">
                                {/* <h6>NEWSLETTER</h6>
                                <form action="#">
                                    <input type="text" placeholder="Email" />
                                    <button type="submit" className="site-btn">Subscribe</button>
                                </form> */}
                                <div className="footer__social">
                                    <Link to="#"><i className="fab fa-facebook"></i></Link>
                                    <Link to="#"><i className="fab fa-twitter"></i></Link>
                                    <Link to="#"><i className="fab fa-youtube"></i></Link>
                                    <Link to="#"><i className="fab fa-instagram"></i></Link>
                                    <Link to="#"><i className="fab fa-pinterest"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="footer__copyright__text">
                                <p>Created by Sara Shaikh<i className="fa fa-heart" aria-hidden="true"></i> .</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
}

export default  Footer;
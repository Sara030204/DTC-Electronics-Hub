import {Link} from 'react-router-dom';
import { UserContext, CartContext } from '../Context';
import { useContext } from 'react';

function Header(){
  const checkVendor=localStorage.getItem('vendor_login');
  const userContext=useContext(UserContext);
  const {cartData,setCartData}=useContext(CartContext);
  if(cartData==null){
    var cartItems=0;
  }else{
    var cartItems=cartData.length;
  };

    return (
        <header className="header" style={{
            position: 'sticky',
            top: '0',
            zIndex: '1000', 
        }}>
        
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-3 col-lg-2">
                        <div className="header__logo">
                        <Link to="/"><img src="/logo.png" height={50} alt="GAdget GAlaxy" /></Link>
                        </div>
                    </div>
                    <div className="col-xl-7 col-lg-6">
                        <nav className="header__menu">
                            <ul>
                                <li><Link to="/" className="active Link">Home</Link></li>
                                <li><Link to="/categories" className='Link'>categories</Link></li>
                                <li><Link to="#" className='Link'> Customer </Link>
                                    <ul className="dropdown">
                                    {userContext != 'true' &&
                                       <>
                                        <li><Link to="/customer/login " className='Link'>login</Link></li>
                                        <li><Link to="/customer/register" className='Link'>registration</Link></li>
                                        </>
                                    }
                                      {userContext == 'true' &&
                                      <>
                
                                        <li><Link to="/customer/dashboard" >dashboard</Link></li>
                                        <li><Link to="/customer/logout"> logout</Link></li>
                                        </>
                                    }
                                    </ul>
                                </li>
                                <li><Link to="#" className='Link'> Vendor </Link>
                                    <ul className="dropdown">
                                    {!checkVendor && 
                                       <>
                                        <li><Link to="/vendor/login">login</Link></li>
                                        <li><Link to="/vendor/register">registration</Link></li>
                                        </>
                                    }
                                      {checkVendor  &&
                                      <>
                
                                        <li><Link to="/vendor/dashboard">dashboard</Link></li>
                                        <li><Link to="/vendor/logout"> logout</Link></li>
                                        </>
                                    }
                                    </ul>
                                </li>
                                <li><Link to="/checkout" className='Link'>My cart ({cartItems})</Link></li>
                                <li><Link to="/contact" className='Link'>Contact</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-lg-2">
                        <div className="header__right">
                            
                            <ul className="header__right__widget">
                            <li><Link to="/checkout" className='Link'><span className="icon_bag_alt"></span>
                                    <div className="tip ">{cartItems}</div>
                                </Link></li>
                                <li><Link to="/customer/wishlist" className='Link'><span className="icon_heart_alt"></span>
                                    <div className="tip ">-</div>
                                </Link></li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="canvas__open">
                    <i className="fa fa-bars"></i>
                </div>
            </div>
        </header>
    );
}

export default Header;

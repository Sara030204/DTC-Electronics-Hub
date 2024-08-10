import { Link } from 'react-router-dom';
import './sb-admin-2.css'; 

function Sidebar() {
    return (
        // <ul className="navbar-nav bg-gradient-yellow sidebar sidebar-dark accordion" id="accordionSidebar">
        //     <Link to="/" className="sidebar-brand d-flex align-items-center justify-content-center">
        //         <div className="sidebar-brand-icon rotate-n-15">
        //             {/* Your brand icon */}
        //         </div>
        //         <div className="sidebar-brand-text "><Link to='/customer/dashboard' >Dashboard</Link></div>
        //     </Link>

        //     <hr className="sidebar-divider my-0" />

        //     <li className="nav-item active">
        //         <Link to="/" className="nav-link">
        //             <i className="fas fa-home"></i>
        //             <span>  HOME</span>
        //         </Link>
        //     </li>

        //     <hr className="sidebar-divider" />

        //     <div className="sidebar-heading">
        //         Interface
        //     </div>

        //     <li className="nav-item">
        //         <Link to="/customer/orders" className="nav-link">
        //         <i className="fa-solid fa-cart-shopping"></i>
        //             <span> Orders</span>
        //         </Link>
        //     </li>

        //     <li className="nav-item">
        //         <Link to="/customer/wishlist" className="nav-link">
        //         <i className="fa-solid fa-heart"></i>
        //             <span> Wishlist</span>
        //         </Link>
        //     </li>

        //     <li className="nav-item">
        //         <Link to="/customer/profile" className="nav-link">
        //         <i className="fa-solid fa-arrows-rotate" aria-hidden="true"></i>

        //             <span> Update profile</span>
        //         </Link>
        //     </li>

        //     <li className="nav-item">
        //         <Link to="/customer/changepassword" className="nav-link">
        //             <i className="fa-solid fa-key" aria-hidden="true"></i>
        //             <span> Change Password</span>
        //         </Link>
        //     </li>

        //     {/* <li className="nav-item">
        //         <Link to="/customer/address" className="nav-link">
        //         <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
        //             <span>Address</span>
        //         </Link>
        //     </li> */}

        //     <li className="nav-item">
        //         <Link to="/customer/logout" className="nav-link">
        //         <i className="fa-solid fa-right-from-bracket" aria-hidden="true"></i>
        //             <span>Logout</span>
        //         </Link>
        //     </li>
        //     <hr className="sidebar-divider" />

        //     <hr className="sidebar-divider d-none d-md-block" />

        //     <div className="text-center d-none d-md-inline">
        //         <button className="rounded-circle border-0" id="sidebarToggle"></button>
        //     </div>
        // </ul>




<ul className="navbar-nav bg-gradient-yellow sidebar sidebar-dark accordion" id="accordionSidebar"> 
 <div id="nav-bar">
  <input id="nav-toggle" type="checkbox"/>
  <div id="nav-header"><a id="nav-title" target="_blank"> <Link to='/customer/dashboard'>DASHBOARD</Link></a>
    <label for="nav-toggle"><span id="nav-toggle-burger"></span></label>
    <hr/>
  </div>
  <div id="nav-content">
    <div className="nav-button">
        <Link to="/customer/orders">
                 <i className="fa-solid fa-cart-shopping"></i>
                     <span>  Orders</span>
        </Link>
    </div>
    <div className="nav-button">
    <Link to="/customer/wishlist" >
                 <i className="fa-solid fa-heart"></i>
                     <span> Wishlist</span>
                 </Link>
    </div>
    <div className="nav-button">
    <Link to="/customer/profile" >
                 <i className="fa-solid fa-arrows-rotate" aria-hidden="true"></i>
                     <span> Update profile</span>
                 </Link>
    </div>
    <hr/>
    <div className="nav-button">
    <Link to="/customer/changepassword" >
                   <i className="fa-solid fa-key" aria-hidden="true"></i>
                     <span> Change Password</span>
                 </Link>
    </div>
    <div className="nav-button">
    <Link to="/customer/logout" >
                 <i className="fa-solid fa-right-from-bracket" aria-hidden="true"></i>
                     <span>Logout</span>
                 </Link>
    </div>
    <hr/>
    <div id="nav-content-highlight"></div>
  </div>
  <input id="nav-footer-toggle" type="checkbox"/>
  <div id="nav-footer">
    <div id="nav-footer-heading">
      <div id="nav-footer-avatar"><img src="https://gravatar.com/avatar/4474ca42d303761c2901fa819c4f2547"/></div>
      <div id="nav-footer-titlebox"><a id="nav-footer-title" href="https://codepen.io/uahnbu/pens/public" target="_blank"></a><span id="nav-footer-subtitle">Admin</span></div>
      <label for="nav-footer-toggle"><i className="fas fa-caret-up"></i></label>
    </div>
    <div id="nav-footer-content">
      Your privacy and security are our top priorities, and we take every measure to ensure your data is protected.
    </div>
  </div>
</div>
</ul>
    );
}

export default Sidebar;



import { Link } from 'react-router-dom';
import './sb-admin-2.css'; 

function Sidebar() {
    return (
        <>
       


<ul className="navbar-nav bg-gradient-yellow sidebar sidebar-dark accordion" id="accordionSidebar"> 
 <div id="nav-bar">
  <input id="nav-toggle" type="checkbox"/>
  <div id="nav-header"><a id="nav-title" target="_blank"> <Link to='/cusomter/dashboard' >VDashboard</Link></a>
    <label for="nav-toggle"><span id="nav-toggle-burger"></span></label>
    <hr/>
  </div>
  <div id="nav-content">
    <div className="nav-button">
    <Link to="/vendor/products" >
                <i class="fa-solid fa-heart"></i>
                    <span> Products</span>
                </Link>
    </div>
    <div className="nav-button">
    <Link to="/vendor/addproduct" >
                <i class="fa-solid fa-circle"></i>
                    <span> Add Products</span>
                </Link>
    </div>
    <div className="nav-button">
    <Link to="/vendor/orders" >
                <i class="fa-solid fa-arrows-rotate" aria-hidden="true"></i>

                    <span> Orders</span>
                </Link>
    </div>
    <hr/>
    <div className="nav-button">
    <Link to="/vendor/customers" className="nav-link">
                    <i className="fa-solid fa-key" aria-hidden="true"></i>
                    <span> Customers</span>
                </Link>
    </div>
    <div className="nav-button">
    <Link to="/vendor/report" >
                <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
                    <span> Reports</span>
                </Link>
    </div>
    <div className="nav-button">
    <Link to="/vendor/profile" className="nav-link">
                <i class="fa-solid fa-user"  aria-hidden="true"></i>
                    <span> Profile</span>
                </Link>
    </div>
    <div className="nav-button">
    <Link to="/vendor/ChangePassword" className="nav-link">
                <i class="fa-solid fa-key"></i>
                    <span> Change Password</span>
                </Link>
    </div>
    <hr/>
    <div id="nav-content-highlight"></div>
  </div>
  {/* <input id="nav-footer-toggle" type="checkbox"/>
  <div id="nav-footer">
    <div id="nav-footer-heading">
      <div id="nav-footer-avatar"><img src="https://gravatar.com/avatar/4474ca42d303761c2901fa819c4f2547"/></div>
      <div id="nav-footer-titlebox"><a id="nav-footer-title" href="https://codepen.io/uahnbu/pens/public" target="_blank"></a><span id="nav-footer-subtitle">Admin</span></div>
      <label for="nav-footer-toggle"><i className="fas fa-caret-up"></i></label>
    </div>
    <div id="nav-footer-content">
      Your privacy and security are our top priorities, and we take every measure to ensure your data is protected.
    </div>
  </div> */}
</div>
</ul>
</>

    );
}

export default Sidebar;

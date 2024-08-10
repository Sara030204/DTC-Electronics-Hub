

function VendorLogout() {
    localStorage.removeItem('vendor_login');
    localStorage.removeItem('vendor_username');
    localStorage.removeItem('vendor_id');
    window.location.href='/vendor/login';
    

}

export default VendorLogout;
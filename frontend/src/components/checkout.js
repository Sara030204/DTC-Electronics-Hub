import { useContext,useState } from 'react';
import {Link} from 'react-router-dom';
import {  CartContext } from '../Context';

function Checkout(props){
  const {cartData,setCartData}=useContext(CartContext);
  const [productData, setproductData] = useState([]);
  const [cartButtonClickStatus, setcartButtonClickStatus] = useState(false);

  if(cartData==null){
    var cartItems=0;
  }else{
    var cartItems=cartData.length;
  }

  var sum=0;
  cartData.map((item,index)=>{
    sum+=parseFloat(item.product.price);
  });

  const cartRemoveButtonHandler = (product_id) => {
    var previousCart=localStorage.getItem('cartData');
    var cartJson=JSON.parse(previousCart);
    cartJson.map((cart,index)=>{
        if(cart!=null && cart.product.id == product_id){
            // delete cartJson[index];
            cartJson.splice(index,1);
        }
    });
    var cartString=JSON.stringify(cartJson);
    localStorage.setItem('cartData',cartString);
    setcartButtonClickStatus(false);
    setCartData(cartJson);
}


    return (
      <div className="container mt-4">
        <h3>All Items ({cartItems})</h3>
        {cartItems > 0  &&
        <div className='row'>
          <div className='col-md-8 col-12'>
            <div className='table-responsive'>
              <table className='table-bordered table'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                   cartData.map((item,index)=>{
                    return(
                      <tr>
                        <td>{index+1}</td>
                        <td><Link><img src={item.product.image} alt="" width='60'/></Link>
                        <Link><p>{item.product.title}</p></Link></td>
                        <td>{item.product.price}</td>
                        <td>
                        <button title="Remove form Cart" type="button" onClick={()=>
                          cartRemoveButtonHandler(item.product.id)} className='btn btn-warning'>
                            <i className="fa-solid fa-cart-plus"></i> Remove from  Cart
                        </button>
                        </td>
                      </tr>
                    )
                  })
                  }
                  
                </tbody>
                <tfoot>
                <tr >
                    <th colSpan="2">Total : </th>
                    <th >{sum}</th>
                    
                  </tr>
                  <tr>
                    <td colSpan='3' align='center'>
                      <Link to='/categories' className='btn btn-dark'>Continue shopping</Link>
                      <Link to='/confirm-order' className='btn btn-primary ms-1'>Proceed to payment</Link>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
        }
        {cartItems === 0 &&
                      <Link to='/' className='btn btn-success'>Home</Link>
                    }
      </div>
      

 );


}

export default Checkout;
import {Link} from 'react-router-dom';
import SingleProduct from './SingleProduct';
import { useState, useEffect } from 'react';
function AllProducts(){
    const url='http://127.0.0.1:8000/api';
      const [products , setProducts] = useState([]);
      const [totalResult , setTotalResult] = useState([0]);

      useEffect (() =>{
          fetchData(url+'/products');
      },[]);

      function fetchData(url){
          fetch(url)
            .then((response)=> response.json())
            .then((data)=> {
                setProducts(data.results);
                setTotalResult(data.count);
            });
      }

      function changeUrl(url){
        fetchData(url);
      }

      var links=[];
      var limit=12;
      var totalLinks=totalResult/limit;
      for(let i=1; i<=totalLinks; i++){
        links.push(<li class="page-item"><Link onClick={()=>changeUrl(url+'/products/?page='+i)} to={'/products/?page='+i} className="page-link">{i}</Link></li>)
        
      }

    return(
            <section className="container mt-4">
            <h3 className='mb-3' >Laptop products </h3>
            <div className='row'>
                {   products.map((product) => 
                    <SingleProduct product={product} />)
                }
            </div>
            

            <nav aria-label="Page navigation example">
                <ul className="pagination">
                   {links}
                </ul>
            </nav>
        </section>

          
    )
};
export default AllProducts;
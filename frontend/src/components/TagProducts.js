import SingleProduct from './SingleProduct';
import { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import { useParams  } from 'react-router-dom';

function TagProducts(props){
      const url='http://127.0.0.1:8000/api';
      const [products , setProducts] = useState([]);
      const [totalResult , setTotalResult] = useState([0]);
      const {tag} = useParams();

      useEffect (() =>{
          fetchData(url+'/products/'+tag);
      },[]);

      function fetchData(url){
          fetch(url).then((response)=> response.json())
            .then((data)=> {
                setProducts(data.results);
                setTotalResult(data.count);
            });
      }

      function changeUrl(url){
        fetchData(url);
      }

      var links=[];
      var limit=1;
      var totalLinks=totalResult/limit;
      for(let i=1; i<=totalLinks; i++){
        links.push(<li class="page-item"><Link onClick={() => changeUrl(url+'/products/'+{tag}+'/?page=' + i)}
        to={`/products/${tag}/?page=${i}`}
        className="page-link">{i}</Link></li>)
      }

    return(
            <section className="container mt-4">
            <h3 className='mb-3' >All products  </h3>
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
export default TagProducts;
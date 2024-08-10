import {Link} from 'react-router-dom';
import SingleSeller from './vendor/SingleSeller';
import { useState, useEffect } from 'react';
function AllVendors(){
    const url='http://127.0.0.1:8000/api';
      const [VendorList , setVendorList] = useState([]);
      const [totalResult , setTotalResult] = useState([0]);

      useEffect (() =>{
          fetchData(url+'/vendors');
      },[]);

      function fetchData(url){
          fetch(url)
            .then((response)=> response.json())
            .then((data)=> {
                setVendorList(data.results);
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
        links.push(<li class="page-item"><Link onClick={()=>changeUrl(url+'/vendor/?page='+i)} to={'/vendors/?page='+i} className="page-link">{i}</Link></li>)
        
      }

    return(
            <section className="container mt-4">
            <h3 className='mb-3' >Vendor products</h3>
            <div className='row'>
            {   
                VendorList && VendorList.map((vendor) => <SingleSeller vendor={vendor} />)
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
export default AllVendors;
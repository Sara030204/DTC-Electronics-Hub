import { Link} from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../Context';
import SingleProduct from '../SingleProduct';
import axios from 'axios';

function VendorDetail() {
    const url = 'http://127.0.0.1:8000/api';
    const [ProductList, setProductList] = useState([]);
    const { vendor_username, vendor_id } = useParams();
    const userContext = useContext(UserContext);

    useEffect(() => {
        fetchData(url + '/vendor-products/' + vendor_id);
    }, []);

 
    function fetchData(url) {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setProductList(data.results);
                
            });
    }

    
    return (

        <section className="container mt-4">
            <div className="row">
            {   ProductList.map((product) => 
                    <SingleProduct product={product} />)
                }
            </div>

        </section>
    );
}
export default VendorDetail;
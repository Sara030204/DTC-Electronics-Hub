import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
function Categories() {
  const url = 'http://127.0.0.1:8000/api';
  const [categories, setCategories] = useState([]);
  
  const [totalResult, setTotalResult] = useState([]);

  const imgStyle = {
    width: '100%',
    height: '17vw',
    objectFit: 'contain',
  };

  useEffect(() => {
    fetchData(url + '/categories');
  }, []);

  function fetchData(url) {
    fetch(url).then((response) => response.json())
      .then((data) => {
        setCategories(data.results);
        setTotalResult(data.count);
      });
  }

  function changeUrl(url) {
    fetchData(url);
  }

  var links = [];
  var limit = 1;
  var totalLinks = totalResult / limit;
  for (let i = 1; i <= totalLinks; i++) {
    links.push(
      <li className="page-item" key={i}>
        <Link onClick={() => changeUrl(url + '/categories/?page=' + i)} to={'/categories/?page=' + i} className="page-link">{i}</Link>
      </li>
    );
  }

  return (
    <section className="container mt-4">
      <h3 className='mb-1'>All Categories </h3>
      <div className='row mt-1'>
        { categories && categories.map((category) =>
          <div className='col-12 col-md-3' key={category.id}>
            <section className="mx-auto my-4" style={{ maxWidth: '20rem' }}>
              <div className="card">
                <div className="bg-image hover-overlay ripple rounded-1" style={imgStyle} data-mdb-ripple-color="light">
                  <img className="img-fluid" src={category.cat_img} alt={category.title} />
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-center">
                    <h5 className="card-title font-weight-bold mb-1">
                      <Link to={'/category/'+category.title+'/'+category.id}>{category.title}</Link>
                    </h5>
                  </div>
                </div>
              </div>
            </section>

          </div>
         )} 
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {links}
        </ul>
      </nav>
    </section>
  );
}

export default Categories;

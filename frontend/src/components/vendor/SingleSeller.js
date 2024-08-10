import {Link} from 'react-router-dom';

function SingleSeller(props){

    
  const imgStyle = {
    width: '100%',
    height: '12vw',
    objectFit: 'contain',
    
    boxShadow: '0 8px 8px rgba(0,0,0,0.5)', 
  };

  const usernameStyle = {
    textAlign: 'center',
    color: 'black', // Change the color here
};


    return (
        <div className='col-12 col-md-3'>
        <section className="mx-auto my-5" style={{ maxWidth: '20rem' }}>

        <div className="card-body">
                    <div>
                        <h5 className="card-title font-weight-bold mb-2" style={usernameStyle}>
                            <Link to={'/vendor/' +props.vendor.user.username+'/'+props.vendor.id} style={usernameStyle}>
                                {props.vendor.user.username}
                            </Link>
                        </h5>
                    </div>
                    
                </div>
            <div className="card">
                <div className="bg-image hover-overlay ripple rounded-1" data-mdb-ripple-color="light">
                    <Link to={'/vendor/' +props.vendor.user.username+'/'+props.vendor.id}>
                        <img className="img-fluid" src={props.vendor.profile_img} style={imgStyle} alt="Card image cap" />
                    </Link>
                    <a href="#!">
                        <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                    </a>
                </div>
                
            </div>
        </section>
    </div>
    );
}

export default SingleSeller;

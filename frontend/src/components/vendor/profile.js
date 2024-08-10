import Sidebar from './sidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function VProfile(props) {
    const url = 'http://127.0.0.1:8000/api';
    const [CheckFormData,setCheckFormData]=useState(false);
    const [CheckFormUserData,setCheckFormUserData]=useState(false);

    const [ProfileData, setProfileData] = useState({
        'user_id': '',
        'first_name': '',
        'last_name': '',
        'username': '',
        'address':'',
        'mobile': '',
        'email': '',
        'v_image':'',
    });

    var vendor_id = localStorage.getItem("vendor_id");
    console.log(vendor_id);

    useEffect(() => {
        fetchData(url + '/vendor/' + vendor_id);
    }, []);

    function fetchData(url) {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setProfileData({
                    'user_id': data.user.id,
                    'first_name': data.user.first_name,
                    'last_name': data.user.last_name,
                    'username': data.user.username,
                    'address':data.address,
                    'mobile': data.mobile,
                    'email': data.user.email,
                    'v_image':data.profile_img,
                    
                });
            });
    }

    const inputHandler = (event) => {
        setProfileData({
            ...ProfileData,
            [event.target.name]: event.target.value
        });

    };

    const handleFileChange = (event) => {
        setProfileData({
            ...ProfileData,
            [event.target.name]: event.target.files[0]
        });

    };


    const submitHandler=(event)=>{
        
        const formData = new FormData();
        formData.append('user',ProfileData.user_id);
        formData.append('address', ProfileData.address);
        formData.append('mobile', ProfileData.mobile);
        formData.append('profile_img', ProfileData.v_image);
        
        //submit data 
        axios.put(url + '/vendor/'+vendor_id+'/', formData,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(function (response) {
                console.log(response);
                setCheckFormData(true);
            })
            .catch(function (error) {
                console.log(error);
                setCheckFormData(false);
            });

            const formUserData = new FormData();
            formUserData.append('first_name', ProfileData.first_name);
            formUserData.append('last_name', ProfileData.last_name);
            formUserData.append('email', ProfileData.email);
            formUserData.append('username', ProfileData.username); 
            formUserData.append('address', ProfileData.address);     

            axios.put(url + '/user/'+ProfileData.user_id+'/', formUserData)
                .then(function (response) {
                    console.log(response);
                    setCheckFormUserData(true);
                })
                .catch(function (error) {
                    console.log(error);
                    setCheckFormUserData(false);
                });


            if(CheckFormData==true || CheckFormUserData==true){
                Swal.fire({
                icon: "success",
                title: "Profile Updated Succesfully!!",
                showConfirmButton: false,
                timer: 3000
              });
              window.location.reload();

            }
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-6" style={{ padding: '15px' }}>
                    <div className="card o-hidden border-0 shadow-lg my-2">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="p-4">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Update Profile!</h1>
                                        </div>
                                        <form className="user">
                                            <div className="form-group mt-4">
                                                First name:<input type="text" className="form-control form-control-user" onChange={inputHandler}
                                                    value={ProfileData.first_name} name="first_name" required />
                                            </div>
                                            <div className="form-group mt-3">
                                                Last name:<input type="text" className="form-control form-control-user" onChange={inputHandler}
                                                    value={ProfileData.last_name} name="last_name" required />
                                            </div>
                                            <div className="form-group mt-3">
                                                Username:<input type="text" className="form-control form-control-user" onChange={inputHandler}
                                                    name="username"
                                                    value={ProfileData.username} required />
                                            </div>
                                            <div className="form-group mt-3">
                                                Email:<input type="email" className="form-control form-control-user" onChange={inputHandler}
                                                    value={ProfileData.email} name="email" required />
                                            </div>
                                            <div className="form-group mt-3">
                                                Address:<input type="text" className="form-control form-control-user" onChange={inputHandler}
                                                    value={ProfileData.address} name="address" required />
                                            </div>
                                            <div className="form-group mt-3">
                                                Mobile:<input type="number" className="form-control form-control-user" onChange={inputHandler}
                                                    value={ProfileData.mobile} name="mobile" required />
                                            </div>
                                            <div className="form-group mt-3">
                                                <p>
                                                    <img src={ProfileData.v_image} width="100" className='mt-1 rounded'/>
                                                </p>
                                                Profile image :<input type="file" className="form-control form-control-user" onChange={handleFileChange}
                                                     name="v_image" id='v_image' required />
                                            </div>

                                            <div className="text-center">
                                                <button type="button" name="update_profile" onClick={submitHandler} className="btn btn-dark btn-user btn-block mt-3">Update</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VProfile;

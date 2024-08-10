import axios from "axios";
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login(props) {
    const url = 'http://127.0.0.1:8000/api';
    const [formError, setFormError]=useState(false);
    const [errorMsg,seterrorMsg]=useState(""); 
    const [loginFormData, setLoginFormData] = useState({
        "username": '',
        "password": '',
    });

    const inputHandler = (event) => {
        setLoginFormData({
            ...loginFormData,
            [event.target.name]: event.target.value
        })

    };

    const submitHandler = (event) => {
        const formData = new FormData();
        formData.append('username', loginFormData.username);
        formData.append("password", loginFormData.password);

        //submit data 
        axios.post(url + '/vendor/login/', formData)
            .then(function (response) {
                if(response.data.bool==false){
                    setFormError(true);
                    seterrorMsg(response.data.msg);
                }else{
                    console.log(response.data);
                    localStorage.setItem('vendor_id',response.data.id);
                    localStorage.setItem('vendor_login',true);
                    localStorage.setItem('vendor_username',response.data.user);
                    setFormError(false);
                    seterrorMsg('');
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    };


    const checkVendor=localStorage.getItem('vendor_login');
    if(checkVendor){
        window.location.href='/vendor/dashboard'
    }
    const buttonEnable = (loginFormData.username != '' && loginFormData.password != '')

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-6 col-lg-6 col-md-6">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="p-5">
                                        <div className="text-center">
                                        {formError && 
                                            <p className="text-danger">{errorMsg}</p>
                                            }
                                            <h1 className="h4 text-gray-900 mb-4">SIGN IN HERE!</h1>
                                        </div>
                                        <form className="user" >

                                            <div className="form-group  mt-4">
                                                <input type="text" className="form-control form-control-user "
                                                    name="username" value={loginFormData.username} onChange={inputHandler} id='username'
                                                    placeholder="Enter your username..." required />
                                            </div>
                                            <div className="form-group mt-4 ">
                                                <input type="password" className="form-control form-control-user "
                                                    placeholder="Enter your Password" name="password" value={loginFormData.password} onChange={inputHandler} id='pwd' required />
                                            </div>
                                            <div className="text-center">
                                                <button type="button" disabled={!buttonEnable} onClick={submitHandler} className="btn btn-dark btn-user btn-block mt-3 center">LOGIN</button>
                                            </div>
                                            <p style={{ textAlign: 'center', paddingTop: 10 }}>Dont have an account ? <Link to="/vendor/register">Register herer </Link></p>
                                            
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

export default Login;
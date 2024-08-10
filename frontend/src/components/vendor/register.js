import axios from "axios";
import { useState } from 'react';
import { Link } from 'react-router-dom';

function VendorRegister(props){
    const url = 'http://127.0.0.1:8000/api';
    const [errorMsg,seterrorMsg]=useState("");
    const [successMsg,setsuccessMsg]=useState(""); 
    const [registerFormData, setRegisterFormData] = useState({
        "first_name": '',
        "last_name": '',
        "email": '',
        'address':'',
        "mobile": '',
        "username":'',
        "password": '',
    });

    const inputHandler = (event) => {
        setRegisterFormData({
            ...registerFormData,
            [event.target.name]: event.target.value
        })

    };

    const submitHandler = (event) => {
        const formData = new FormData();
        formData.append('first_name', registerFormData.first_name);
        formData.append('last_name', registerFormData.last_name);
        formData.append('email', registerFormData.email);
        formData.append('address', registerFormData.address);
        formData.append('mobile', registerFormData.mobile);
        formData.append('username', registerFormData.username);
        formData.append("password", registerFormData.password);
        
        //submit data 
        axios.post(url + '/vendor/register/', formData)
            .then(function (response) {
                if(response.data.bool==false){
                    seterrorMsg(response.data.msg);
                    setsuccessMsg('');
                }else{
                    setRegisterFormData({
                        "first_name": '',
                        "last_name": '',
                        "email": '',
                        'address':'',
                        "mobile": '',
                        "username":'',
                        "password": '',
                    });
                    seterrorMsg('');
                    setsuccessMsg(response.data.msg);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    };
    const buttonEnable = (registerFormData.username != '') && (registerFormData.password != '') 
    && (registerFormData.email != '') && (registerFormData.mobile != '')
      && (registerFormData.first_name != '') && (registerFormData.last_name != '') && (registerFormData.address != '')



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
                                        <h1 className="h4 text-gray-900 mb-4">SIGN UP HERE!</h1>
                                    </div>
                                    <form className="user" >
                                    {successMsg && <p className="text-success">{successMsg}</p>}
                                        {errorMsg && <p className="text-danger">{errorMsg}</p>}
                                    <div className="form-group mt-4">
                                        <input type="text" className="form-control form-control-user" value={registerFormData.first_name} onChange={inputHandler}
                                            placeholder="Enter your First Name" name="first_name" id="first_name" required />
                                    </div>
                                    <div className="form-group  mt-4">
                                        <input type="text" className="form-control form-control-user" value={registerFormData.last_name} onChange={inputHandler}
                                            placeholder="Enter your Last Name" name="last_name" id="last_name" required />
                                    </div>
                                        <div className="form-group  mt-4">
                                            <input type="text" className="form-control form-control-user " value={registerFormData.email} onChange={inputHandler}
                                                aria-describedby="emailHelp" name="email" id="email"
                                                placeholder="Enter your Email..." required />
                                        </div>
                                        <div className="form-group  mt-4">
                                            <input type="text" className="form-control form-control-user" value={registerFormData.address} onChange={inputHandler}
                                                placeholder="Enter your address" name="address" id="address" required />
                                        </div>
                                        <div className="form-group  mt-4">
                                            <input type="number" className="form-control form-control-user"
                                                placeholder="Enter your contact no." name="mobile" value={registerFormData.mobile} onChange={inputHandler} id="mobile" />
                                        </div>
                                        <div className="form-group  mt-4">
                                            <input type="text" className="form-control form-control-user" value={registerFormData.username} onChange={inputHandler}
                                                placeholder="Enter your username" name="username" id="username" required />
                                        </div>
                                        <div className="form-group mt-4 ">
                                            <input type="password" className="form-control form-control-user "value={registerFormData.password} onChange={inputHandler}
                                                placeholder="Enter your Password" name="password" id="password" required />
                                        </div>
                                        <div className="text-center">
                                        <button type="button" disabled={!buttonEnable} onClick={submitHandler} name="register" className="btn btn-dark btn-user btn-block mt-3 center">Register</button>
                                        </div>
                                        <p style={{ textAlign: 'center', paddingTop: 10 }}>Already have an Account ? <Link to="/vendor/login">Sign in here </Link></p>
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

export default VendorRegister;
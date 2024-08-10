import { Link } from 'react-router-dom';
import Sidebar from './sidebar';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
const url = 'http://127.0.0.1:8000/api';

function ChangePassword(props) {
    const [PasswordData, setPasswordData] = useState({
        'password': '',
        'c_password':'',
        
    });

    const [ConfirmError,setConfirmError]=useState(false);

    const inputHandler = (event) => {
        setPasswordData({
            ...PasswordData,
            [event.target.name]: event.target.value
        });

        

    };
    var customer_id = localStorage.getItem("customer_id");
    console.log(customer_id);
    const submitHandler = (event) => {
        event.preventDefault(); // Prevent default form submission
        if (PasswordData.password === PasswordData.c_password) {
            setConfirmError(false);
    
            const formData = new FormData();
            formData.append('password', PasswordData.password);
    
            axios.post(url + '/customer-change-password/' + customer_id + '/', formData)
                .then(function (response) {
                    Swal.fire({
                        text: "Password change successfully!",
                        icon: "success"
                    });
                })
                .catch(function (error) {
                    Swal.fire({
                        text: "Something went wrong!",
                        icon: "error"
                    });
                });
        } else {
            setConfirmError(true);
        }
    };
    
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-7" style={{ padding: '20px' }}>
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="p-5">
                                        {
                                            ConfirmError && <p className='text-danger'>Password does not match</p>
                                        }
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Change password!</h1>
                                        </div>
                                        <form className="user">
                                            
                                            <div className="form-group mt-4">
                                                <input type="password" className="form-control form-control-user" placeholder='Enter new password '
                                                     name="password" id='password' value={PasswordData.password} onChange={inputHandler} />
                                            </div>
                                            <div className="form-group mt-4">
                                                <input type="password" className="form-control form-control-user"  placeholder='Confirm new password '
                                                     name="c_password" id='c_password' value={PasswordData.c_password} onChange={inputHandler} />
                                            </div>
                                            <div className="text-center">
                                                <button type="button" name="change_password" onClick={submitHandler} className="btn btn-dark btn-user btn-block mt-3">Change Password</button>
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

export default ChangePassword;

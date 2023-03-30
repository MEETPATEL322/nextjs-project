import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
// import style from '../styles/login.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const [login, setlogin] = useState({});
    const router = useRouter()
    const handlesubmit = async (e) => {
        e.preventDefault();

        // const responsejson=await fetch("",)
        let response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(login),
        })
        let responsejson = await response.json()
        console.log("responce", responsejson.msg)
        if (responsejson.success) {
            localStorage.setItem("token", responsejson.token)
            toast.success(responsejson.msg, {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                router.push("/info")
            }, 1000);


        } else {
            toast.error(responsejson.msg, {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }

    }
    const handleChange = (e) => {
        e.preventDefault()
        setlogin({ ...login, [e.target.name]: e.target.value })
    }
    return (
        <>
            <style jsx>
                {`
            		.container form {
                        margin: 0 auto;
                        max-width: 400px;
                        padding: 20px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        background-color: #fff;
                    }
            
                    .container h1 {
                        text-align: center;
                        margin-top: 50px;
                        margin-bottom: 30px;
                    }
            
                    input[type="text"],
                    input[type="password"] {
                        padding: 10px;
                        width: 100%;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        margin-bottom: 20px;
                    }
            
                    .container label {
                        margin-bottom: 10px;
                        display: block;
                    }
            
                    .container input[type="radio"] {
                        margin-right: 10px;
                    }
            
                    .container input[type="submit"] {
                        background-color: #4CAF50;
                        color: #fff;
                        padding: 10px 20px;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        margin-top: 20px;
                    }
            
                    .container input[type="submit"]:hover {
                        background-color: #45a049;
                    }
            `}
            </style>
            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className={"container"}>

                <div className="row">
                    <div className="col-md-12">
                        <h1>Login Page</h1>
                        <form onSubmit={handlesubmit}>
                            <div className="form-group">
                                <label htmlFor="type">Account Type:</label>
                                <div className="form-check">
                                    <input type="radio" id="user" onChange={handleChange} name="type" value="User" className="form-check-input" />
                                    <label htmlFor="user" className="form-check-label">User</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" id="admin" onChange={handleChange} name="type" value="Admin" className="form-check-input" />
                                    <label htmlFor="admin" className="form-check-label">Admin</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">email:</label>
                                <input type="text" id="email" onChange={handleChange} name="email" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" onChange={handleChange} name="password" className="form-control" />
                            </div>
                            <Link href={'/signup'}>Register</Link>
                            <br />
                            <Link className='text-center' href={'/forgetpassword'}>ForgetPassword?</Link>
                            <br />

                            <input type="submit" value="Login" className="btn btn-primary btn-block" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;

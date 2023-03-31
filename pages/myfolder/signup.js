import React from 'react';

const Signup = () => {
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
            <div className={"container"}>
                <div className="row">
                    <div className="col-md-12">
                        <h1>Signup Page</h1>
                        <form>
                            <div className="form-group">
                                <label htmlFor="type">Account Type:</label>
                                <div className="form-check">
                                    <input type="radio" id="user" name="type" value="user" className="form-check-input" />
                                    <label htmlFor="user" className="form-check-label">User</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" id="admin" name="type" value="admin" className="form-check-input" />
                                    <label htmlFor="admin" className="form-check-label">Admin</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">email:</label>
                                <input type="text" id="email" name="email" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" name="password" className="form-control" />
                            </div>

                            <input type="submit" value="Register" className="btn btn-primary btn-block" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;

import React, { useEffect, useState } from 'react';
import style from '../styles/contact.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const Login = () => {
  const [loginData, setloginData] = useState({});
  const router = useRouter()
  const handlesubmit = async (e) => {
    e.preventDefault()
    console.log("url", process.env.API_URL)
    let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
    let responsejson = await response.json()
    // console.log("responce", responsejson.msg)
    if (responsejson.success) {
      localStorage.setItem("token", responsejson.token)
      localStorage.setItem("type", responsejson.type)
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
        if (responsejson.type == "Admin") {
          router.push("/admin")
        } else {
          router.push("/profile")
        }
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
  useEffect(() => {
    if (localStorage.getItem("token") && (localStorage.getItem("type") == "User")) {
      router.push("/profile")
    } else if (localStorage.getItem("token") && (localStorage.getItem("type") == "Admin")) {
      router.push("/admin")

    } else {
      router.push("/login")
    }
  }, [])
  const handlechange = (e) => {
    e.preventDefault();
    setloginData({ ...loginData, [e.target.name]: e.target.value })
  }
  return (
    <>
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
      <section className={`${style["login-block"]} ${style["login-Form"]} `}>
        <div className={`container ${style['']}`}>
          <form className="login-form mt-3" onSubmit={handlesubmit}>
            <div className="row">
              <div className="col-md-10 mx-auto text-center mb-2">
                <h2 className={`${style['Heading']}`}>Log In</h2>
              </div>
              {/* RadioBox2 */}
              <div className="col-md-6">
                <div className={`${style['form-group']} form-group`}>
                  <div className={`${style["RadioBox"]} ${style["RadioBox2"]}`} >
                    <div className={`${style["form-check"]} form-check`}>
                      <input className={`${style["form-check-input"]} form-check-input`} type="radio" value="Admin" onChange={handlechange} name="type" id="flexRadioAdmin" />
                      <label className={`${style["form-check-label"]} form-check-label`} htmlFor="flexRadioAdmin">Admin</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className={`${style['form-group']} form-group`}>
                  <div className={`${style["RadioBox"]} ${style["RadioBox2"]}`} >
                    <div className={`${style["form-check"]} form-check`}>
                      <input className={`${style["form-check-input"]} form-check-input`} type="radio" value="User" onChange={handlechange} name="type" id="flexRadioUser" />
                      <label className={`${style["form-check-label"]} form-check-label`} htmlFor="flexRadioUser">User</label>
                    </div>
                  </div>
                </div>
              </div>
              {/* RadioBox2 */}
              {/* Email address */}
              <div className="col-md-12">
                <div className={`${style['form-group']} form-group`}>
                  <label htmlFor="exampleInputEmail" className="">Email address</label>
                  <input type="email" onChange={handlechange} name='email' className={`${style['form-control']} form-control`} placeholder="email" />
                </div>
              </div>
              {/* Password */}
              <div className="col-md-12">
                <div className={`${style['form-group']} form-group`}>
                  <label htmlFor="exampleInputPassword" className="">Password</label>
                  <input type="password" onChange={handlechange} name='password' className={`${style['form-control']} form-control`} placeholder="password" />
                </div>
              </div>
              <div className="col-md-12 mt-3">
                <button type="submit" className={`${style['SubmitBtn']} btn`}>Submit</button>
                <div className='pt-2'>Don't have an account? <a href="signup_form">sign Up</a></div>
                <div className='pt-2'><a href="forgot">Forgot Password?</a></div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;

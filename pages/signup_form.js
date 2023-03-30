import React, { useState } from "react";
import style from '../styles/contact.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";

const SignUPForm = () => {
  const [registerData, setregisterData] = useState({});
  const router = useRouter()
  const handlesubmit = async (e) => {
    e.preventDefault();
    let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData)

    })

    let responcejson = await response.json()
    // console.log("responsejsondata", responcejson.success)
    if (responcejson.success) {
      toast.success(responcejson.message, {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        router.push("/login")
      }, 2000);
    }
    else {
      toast.error(responcejson.message, {
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

  const handlechange = (e) => {
    e.preventDefault();
    setregisterData({ ...registerData, [e.target.name]: e.target.value })
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
                <h2 className={`${style['Heading']}`}>Register</h2>
              </div>
              {/* RadioBox2 */}
              <div className="col-md-6">
                <div className={`${style['form-group']} form-group`}>
                  <div className={`${style["RadioBox"]} ${style["RadioBox2"]}`} >
                    <div className={`${style["form-check"]} form-check`}>
                      <input className={`${style["form-check-input"]} form-check-input`} type="radio" onChange={handlechange} name="type" value={"Admin"} id="flexRadioAdmin" />
                      <label className={`${style["form-check-label"]} form-check-label`} for="flexRadioAdmin">Admin</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className={`${style['form-group']} form-group`}>
                  <div className={`${style["RadioBox"]} ${style["RadioBox2"]}`} >
                    <div className={`${style["form-check"]} form-check`}>
                      <input className={`${style["form-check-input"]} form-check-input`} type="radio" onChange={handlechange} name="type" value={"User"} id="flexRadioUser" />
                      <label className={`${style["form-check-label"]} form-check-label`} for="flexRadioUser">User</label>
                    </div>
                  </div>
                </div>
              </div>
              {/* RadioBox2 */}
              {/* Email address */}
              <div className="col-md-12">
                <div className={`${style['form-group']} form-group`}>
                  <label for="exampleInputEmail" className="">Email address</label>
                  <input type="email" asp-for="Emailaddress" onChange={handlechange} name="email" className={`${style['form-control']} form-control`} placeholder="enter email" />
                </div>
              </div>
              {/* Password */}
              <div className="col-md-12">
                <div className={`${style['form-group']} form-group`}>
                  <label for="exampleInputPassword" className="">Password</label>
                  <input type="password" asp-for="Password" onChange={handlechange} name="password" className={`${style['form-control']} form-control`} placeholder="enter password" />
                </div>
              </div>
              <div className="col-md-12 mt-3">
                <button type="submit" className={`${style['SubmitBtn']} btn`}>Submit</button>
                <div className='pt-2'> <a href="/login">Back</a></div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default SignUPForm;

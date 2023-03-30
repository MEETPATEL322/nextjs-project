import React, { useState } from 'react';
import style from '../styles/contact.module.css';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Resetpassword = () => {
  const [resetData, setresetData] = useState({});
  const router = useRouter()
  const id = router.query.id
  const token = router.query.token
  const handlesubmit = async (e) => {
    e.preventDefault();
    let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resetpassword?id=${id}&token=${token}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resetData)
    })
    let responsejson = await response.json()
    // console.log("responsejson", responsejson)
    if (responsejson.success) {

      toast.success(responsejson.message, {
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


    } else {
      toast.error(responsejson.message, {
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
    setresetData({ ...resetData, [e.target.name]: e.target.value })
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
                <h2 className={`${style['Heading']}`}>Reset Your Password</h2>
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
                  <label for="exampleInputEnterPassword1" className="">New Password</label>
                  <input type="password" asp-for="EnterPassword" onChange={handlechange} name='newpassword' className={`${style['form-control']} form-control`} placeholder="newpassword" />
                </div>
              </div>
              {/* Password */}
              <div className="col-md-12">
                <div className={`${style['form-group']} form-group`}>
                  <label for="exampleInputEnterPassword2" className="">Re-Enter New Password</label>
                  <input type="password" asp-for="EnterPassword2" onChange={handlechange} name='confirmpassword' className={`${style['form-control']} form-control`} placeholder="confirmpassword" />
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

export default Resetpassword;

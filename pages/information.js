import React, { useState } from 'react';
import style from '../styles/contact.module.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/router';

const Information = () => {
    const [infoData, setinfoData] = useState({});
    const [image, setimage] = useState({});
    const [file, setfile] = useState();
    const [checkeddata, setcheckeddata] = useState([]);
    const router=useRouter()

    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log("INFOO", { infoData, image, checkeddata })
        // console.log("INFOO", )

        const formdata = new FormData()
        formdata.append("firstname", infoData.firstname)
        formdata.append("lastname", infoData.lastname)
        formdata.append("image", image)
        formdata.append("gender", infoData.gender)
        formdata.append("mobile", infoData.mobile)
        formdata.append("address", infoData.address)
        formdata.append("filename", image.name)
        formdata.append("birthdate", infoData.birthdate)
        formdata.append("education", infoData.education)
        formdata.append("languages", checkeddata.map(item => item.languages))
        formdata.append("email", infoData.email)
        console.log("FormData", formdata.firstname)
        let url = `${process.env.NEXT_PUBLIC_API_URL}/api/information`
        axios.post(url, formdata, {
            headers: {
                // "Access-Control-Allow-Origin": "*",
                // "Access-Control-Allow-Methods": "POST, GET, PUT, OPTIONS, DELETE",
                // "Access-Control-Allow-Headers":
                //     "Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type",
                // Accept: "application/x-www-form-urlencoded",
                "Content-Type": "multipart/form-data",
                // mimeType: "multipart/form-data",

            },
        }).then((response) => {


            if (response.data.success) {

                toast.success(response.data.message, {
                    position: "bottom-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => {

                    router.push("/admin")
                }, 1000);


            } else {
                toast.error(response.data.message, {
                    position: "bottom-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            }
        })
    }
    const handlefile = (e) => {
        e.preventDefault();
        setimage(e.target.files[0])
        setfile(URL.createObjectURL(e.target.files[0]))
    }

    const handlechange = (e) => {
        e.preventDefault();
        setinfoData({ ...infoData, [e.target.name]: e.target.value })
    }
    const handlechecked = (e) => {
        e.preventDefault();
        // const data = [];
        // data.push(e.target.value)
        // setcheckeddata(data)
        const { value, checked, name } = e.target
        console.log(`${value} is ${checked}`)
        if (checked) {
            setcheckeddata([...checkeddata, { [e.target.name]: value }])
        }
        else {
            setcheckeddata(checkeddata.filter((e) => e !== value))
        }
        // setcheckeddata({ ...checkeddata, [e.target.name]: [e.target.chacked, e.target.value] })
    }
    return (
        <> <ToastContainer
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
            <section className={`${style["login-block"]}`}>
                <div className={`container ${style['']}`}>
                    <form className="login-form mt-3" onSubmit={handlesubmit}>
                        <div className="row">
                            <div className="col-md-10 mx-auto text-center mb-2">
                                <h2 className={`${style['Heading']}`}>Registration Form</h2>
                            </div>
                            {/* First Name */}
                            <div className="col-md-6">
                                <div className={`${style['form-group']} form-group`}>
                                    <label htmlFor="exampleInputEmail1" className="">First Name</label>
                                    <input type="text" onChange={handlechange} name='firstname' className={`${style['form-control']} form-control`} placeholder="" />
                                </div>
                            </div>
                            {/* Last Name */}
                            <div className="col-md-6">
                                <div className={`${style['form-group']} form-group`}>
                                    <label htmlFor="exampleInputEmail1" className="">Last Name</label>
                                    <input type="text" onChange={handlechange} name='lastname' className={`${style['form-control']} form-control`} placeholder="" />
                                </div>
                            </div>
                            {/* Mobile Number */}
                            <div className="col-md-6">
                                <div className={`${style['form-group']} form-group`}>
                                    <label htmlFor="exampleInputEmail1" className="">Mobile Number</label>
                                    <input type="number" onChange={handlechange} name='mobile' className={`${style['form-control']} form-control`} placeholder="" />
                                </div>
                            </div>
                            {/* Gender */}
                            <div className="col-md-6">
                                <div className={`${style['form-group']} form-group`}>
                                    <label htmlFor="exampleInputGender" className="">Gender</label>
                                    <div className={`${style["RadioBox"]}`} >
                                        <div className={`${style["form-check"]} form-check`}>
                                            <input className={`${style["form-check-input"]} form-check-input`} type="radio" value={"Male"} onChange={handlechange} name="gender" id="flexRadioMale" />
                                            <label className={`${style["form-check-label"]} form-check-label`} htmlFor="flexRadioMale">Male</label>
                                        </div>
                                        <div className={`${style["form-check"]} form-check`}>
                                            <input className={`${style["form-check-input"]} form-check-input`} type="radio" value={"Female"} onChange={handlechange} name="gender" id="flexRadioFemale" />
                                            <label className={`${style["form-check-label"]} form-check-label`} htmlFor="flexRadioFemale">Female</label>
                                        </div>
                                        <div className={`${style["form-check"]} form-check`}>
                                            <input className={`${style["form-check-input"]} form-check-input`} type="radio" value={"Other"} onChange={handlechange} name="gender" id="flexRadioOther" disabled />
                                            <label className={`${style["form-check-label"]} form-check-label`} htmlFor="flexRadioOther">Other</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Email Id */}
                            <div className="col-md-6">
                                <div className={`${style['form-group']} form-group`}>
                                    <label htmlFor="exampleInputEmail1" className="">Email Id</label>
                                    <input type="email" onChange={handlechange} name='email' className={`${style['form-control']} form-control`} placeholder="" />
                                </div>
                            </div>
                            {/* Address */}
                            <div className="col-md-6">
                                <div className={`${style['form-group']} ${style['AddressForm']} form-group`}>
                                    <label htmlFor="exampleInputAddress" className="">Address</label>
                                    <textarea type="text" onChange={handlechange} name="address" className={`${style['form-control']} form-control`} placeholder="" />
                                </div>
                            </div>
                            {/* BirthDate */}
                            <div className="col-md-6">
                                <div className={`${style['form-group']} form-group`}>
                                    <label htmlFor="exampleInputBirthDate" className="">BirthDate</label>
                                    <input type="date" onChange={handlechange} name='birthdate' className={`${style['form-control']} form-control`} placeholder="Abhishel" />
                                </div>
                            </div>
                            {/* Education */}
                            <div className="col-md-6">
                                <div className={`${style['form-group']} form-group`}>
                                    <label htmlFor="exampleInputEducation" className="">Education</label>
                                    {/* <input type="text" asp-htmlFor="Education" placeholder="" /> */}
                                    <select onChange={handlechange} name="education" className={`${style['form-select']} form-select`} aria-label="Default select example">
                                        <option selected>Education menu</option>
                                        <option value="10 pass">10 pass</option>
                                        <option value="12 pass">12 pass</option>
                                        <option value="Greduated">Greduated</option>
                                        <option value="Master">Master</option>
                                        <option value="PHD">PHD</option>
                                    </select>
                                </div>
                            </div>
                            {/* languages */}
                            <div className="col-md-6">
                                <div className={`${style['form-group']} form-group`}>
                                    <label htmlFor="exampleInputlanguages" className="">Languages</label>
                                    <div className={`${style["RadioBox"]}`} >
                                        <div className={`${style["form-check"]} form-check`}>
                                            <input className={`${style["form-check-input"]} form-check-input`} type="checkbox" onChange={handlechecked} name="languages" value="FrondEnd" id="LanguageOne" />
                                            <label className={`${style["form-check-label"]} form-check-label`} htmlFor="LanguageOne">FrondEnd</label>
                                        </div>
                                        <div className={`${style["form-check"]} form-check`}>
                                            <input className={`${style["form-check-input"]} form-check-input`} type="checkbox" onChange={handlechecked} name="languages" value="Backend" id="LanguageTwo" />
                                            <label className={`${style["form-check-label"]} form-check-label`} htmlFor="LanguageTwo">Backend</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Image */}
                            <div className="col-md-6">
                                <div className={`${style['form-group']} form-group`}>
                                    <label htmlFor="exampleInputChoosefile" className="">Choose Image</label>
                                    <input type="file" className="form-control " onChange={handlefile} name='image' id="customFile1" />
                                </div>
                            </div>
                            {/* Salary */}
                            {/* <div className="col-md-6">
                                <div className={`${style['form-group']} form-group`}>
                                    <label htmlFor="customRange1" className="form-label">Salary</label>
                                    <input type="range" className="form-range" id="customRange1" />
                                </div>
                            </div> */}

                            <div className="col-md-12 mt-3">
                                <button type="submit" className={`${style['SubmitBtn']} btn`}>Submit</button>

                            </div>

                        </div>
                    </form>
                </div>
            </section></>
    );
}

export default Information;
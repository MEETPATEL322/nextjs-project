import React, { useEffect, useState } from 'react';
import style from '../styles/contact.module.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/router';
import AdminNavbar from '@/Components/AdminNavbar';
import Link from 'next/link';
import Image from 'next/image';
import moment from "moment";
const Information2 = () => {
    const [firstname, setfirstname] = useState();
    const [image, setimage] = useState();
    const [lastname, setlastname] = useState();
    const [email, setemail] = useState();
    const [id, setid] = useState();
    const [mobile, setmobile] = useState();
    const [address, setaddress] = useState();
    const [education, seteducation] = useState();
    const [languages, setlanguages] = useState('');
    const [gender, setgender] = useState(false);
    const [birthdate, setbirthdate] = useState();
    const [file, setfile] = useState();
    const [lang, setlang] = useState()
    const router = useRouter()

    useEffect(() => {
        setid(localStorage.getItem('ID'));
        setfirstname(localStorage.getItem('firstname'));
        setimage(localStorage.getItem('image'));
        setlastname(localStorage.getItem('lastname'));
        setemail(localStorage.getItem('email'));
        seteducation(localStorage.getItem('education'));
        setlanguages(localStorage.getItem('languages'));
        setgender(localStorage.getItem('gender'));
        setbirthdate(localStorage.getItem('birthdate'));
        setaddress(localStorage.getItem('address'));
        setmobile(localStorage.getItem('mobile'));
    }, [])
    console.log({ id, firstname, email, languages })
    const data22 = languages.split(",")
    // const checkbox = document.querySelector('#my-checkbox');
    // checkbox.checked = checkboxValue;
    const handlechecked = (e) => {
        // const data = [];
        // data.push(e.target.value)
        // setcheckeddata(data)
        const { value, checked, name } = e.target
        console.log(`${value} is ${checked}`)
        if (checked) {
            setlanguages([...languages, { [e.target.name]: value }])
        }
        else {
            setlanguages(languages.filter((e) => e !== value))
        }
        // setcheckeddata({ ...checkeddata, [e.target.name]: [e.target.chacked, e.target.value] })
    }
    function updateData() {
        const formdata = new FormData()
        console.log("IMAGE", image)
        formdata.append("firstname", firstname)
        formdata.append("lastname", lastname)
        formdata.append("image", image)
        formdata.append("gender", gender)
        formdata.append("mobile", mobile)
        formdata.append("address", address)
        formdata.append("filename", image.name)
        formdata.append("birthdate", birthdate)
        formdata.append("education", education)
        formdata.append("languages", languages.map(item => item.languages))
        formdata.append("email", email)
        let url = `${process.env.NEXT_PUBLIC_API_URL}/api/information?id=${id}`
        // axios.put(url, formdata).then((response) => console.log(response.data))
        // axios.put(url, formdata
        // ).then((response) => {

        //     console.log("Response", response.data)
        //     if (response.data.success) {
        //         toast.success(response.data.message, {
        //             position: "bottom-center",
        //             autoClose: 1000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //         });
        //         setTimeout(() => {
        //             router.push("/admin")
        //         }, 1000);


        //     } else {
        //         toast.error(response.data.message, {
        //             position: "bottom-center",
        //             autoClose: 1000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //         });
        //     }
        // })
    }
    return (
        <>
            <AdminNavbar />
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
            <section className={`${style["login-block"]}`}>
                <div className={`container ${style['']}`}>
                    <form className="login-form mt-3" >
                        <div className="row">
                            <div className="col-md-10 mx-auto text-center mb-2">
                                <h2 className={`${style['Heading']}`}>Registration Form</h2>
                            </div>
                            {/* First Name */}
                            <div className="col-md-6">
                                <div className={`${style['form-group']} form-group`}>
                                    <label htmlFor="exampleInputEmail1" className="">First Name</label>
                                    <input type="text" value={firstname} onChange={(e) => setfirstname(e.target.value)} name='firstname' className={`${style['form-control']} form-control`} placeholder="" />
                                </div>
                            </div>
                            {/* Last Name */}
                            <div className="col-md-6">
                                <div className={`${style['form-group']} form-group`}>
                                    <label htmlFor="exampleInputEmail1" className="">Last Name</label>
                                    <input type="text" value={lastname} onChange={(e) => setlastname(e.target.value)} name='lastname' className={`${style['form-control']} form-control`} placeholder="" />
                                </div>
                            </div>
                            {/* Mobile Number */}
                            <div className="col-md-6">
                                <div className={`${style['form-group']} form-group`}>
                                    <label htmlFor="exampleInputEmail1" className="">Mobile Number</label>
                                    <input type="number" value={mobile} onChange={(e) => setmobile(e.target.value)} name='mobile' className={`${style['form-control']} form-control`} placeholder="" />
                                </div>
                            </div>
                            {/* Gender */}
                            <div className="col-md-6">
                                <div className={`${style['form-group']} form-group`}>
                                    <label htmlFor="exampleInputGender" className="">Gender</label>
                                    <div className={`${style["RadioBox"]}`} >
                                        <div className={`${style["form-check"]} form-check`}>
                                            <input className={`${style["form-check-input"]} form-check-input`} type="radio" value={"Male"} onChange={(e) => setgender(e.target.value)} name="gender" id="flexRadioMale" checked={`(${gender}=="Male")` ? true : false} />
                                            <label className={`${style["form-check-label"]} form-check-label`} htmlFor="flexRadioMale">Male</label>
                                        </div>
                                        <div className={`${style["form-check"]} form-check`}>
                                            <input className={`${style["form-check-input"]} form-check-input`} type="radio" value={"Female"} onChange={(e) => setgender(e.target.value)} name="gender" id="flexRadioFemale" checked={`(${gender}=="Female")` ? true : false} />
                                            <label className={`${style["form-check-label"]} form-check-label`} htmlFor="flexRadioFemale">Female</label>
                                        </div>
                                        <div className={`${style["form-check"]} form-check`}>
                                            <input className={`${style["form-check-input"]} form-check-input`} type="radio" value={"Other"} onChange={(e) => setgender(e.target.value)} name="gender" id="flexRadioOther" disabled />
                                            <label className={`${style["form-check-label"]} form-check-label`} htmlFor="flexRadioOther">Other</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Email Id */}
                            <div className="col-md-6">
                                <div className={`${style['form-group']} form-group`}>
                                    <label htmlFor="exampleInputEmail1" className="">Email Id</label>
                                    <input type="email" value={email} onChange={(e) => setemail(e.target.value)} name='email' className={`${style['form-control']} form-control`} placeholder="" />
                                </div>
                            </div>
                            {/* Address */}
                            <div className="col-md-6">
                                <div className={`${style['form-group']} ${style['AddressForm']} form-group`}>
                                    <label htmlFor="exampleInputAddress" className="">Address</label>
                                    <textarea type="text" value={address} onChange={(e) => setaddress(e.target.value)} name="address" className={`${style['form-control']} form-control`} placeholder="" />
                                </div>
                            </div>
                            {/* BirthDate */}
                            <div className="col-md-6">
                                <div className={`${style['form-group']} form-group`}>
                                    <label htmlFor="exampleInputBirthDate" className="">BirthDate</label>
                                    <input type="date" value={moment(`${birthdate}`).utc().format('YYYY-MM-DD')} onChange={(e) => setbirthdate(e.target.value)} name='birthdate' className={`${style['form-control']} form-control`} placeholder="Abhishel" />
                                </div>
                            </div>
                            {/* Education */}
                            <div className="col-md-6">
                                <div className={`${style['form-group']} form-group`}>
                                    <label htmlFor="exampleInputEducation" className="">Education</label>
                                    {/* <input type="text" asp-htmlFor="Education" placeholder="" /> */}
                                    <select value={education} onChange={(e) => seteducation(e.target.value)} name="education" className={`${style['form-select']} form-select`} aria-label="Default select example">
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
                                            <input className={`${style["form-check-input"]} form-check-input`} type="checkbox" onChange={handlechecked} name="languages" value="FrondEnd" id="LanguageOne"  />
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
                                    <input type="file" className="form-control " onChange={(e) => { setimage(e.target.files[0]); setfile(URL.createObjectURL(e.target.files[0])) }} name='image' id="customFile1" />
                                </div>
                                <Image src={`/static/` + image} height={100} width={100} alt={"image"} srcSet={file} />
                            </div>
                            {/* Salary */}
                            {/* <div className="col-md-6">
                            <div className={`${style['form-group']} form-group`}>
                                <label htmlFor="customRange1" className="form-label">Salary</label>
                                <input type="range" className="form-range" id="customRange1" />
                            </div>
                        </div> */}

                            <div className="col-md-12 mt-3">
                                <button type="submit" onClick={updateData} className={`${style['SubmitBtn']} btn`}>Update</button>

                                <div><Link href="/admin">admin</Link></div>

                            </div>
                        </div>
                    </form>
                </div>
            </section></>
    );
}

export default Information2;

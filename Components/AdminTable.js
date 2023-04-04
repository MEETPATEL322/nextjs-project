import React, { useEffect, useState } from 'react';
import style from "../styles/admin.module.css";
import Link from 'next/link'; import axios from 'axios';
import { useRouter } from 'next/router';
import Information from '@/pages/information';
import { MdEdit, MdOutlineDelete } from 'react-icons/md';



const AdminTable = (props) => {
    const { Data1 } = props
    console.log("Data1", Data1)
    const [data, setdata] = useState([]);
    useEffect(() => {
        getuser();
    }, []);
    function getuser() {
        const headers = {
            "Accept": "application/json, text/plain, /", "Content-Type": "multipart/form-data"
        }
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/information`, { headers })
            .then((res) => {
                setdata(res.data.data)
                console.log(res.data)
            })
    }
    function DeleteHandler(id) {

        axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/information?id=${id}`).then((response) => {
            // alert("data deleted Successfully")
            getuser()
        })
    }
    function Updatehandler(item) {
        let { _id, firstname, image, lastname, email, mobile, education, gender, birthdate, languages, address } = item;
        localStorage.setItem("ID", _id);

        localStorage.setItem("image", image);
        localStorage.setItem("firstname", firstname);
        localStorage.setItem("lastname", lastname);
        localStorage.setItem("email", email);
        localStorage.setItem("mobile", mobile);
        localStorage.setItem("gender", gender);
        localStorage.setItem("education", education);
        localStorage.setItem("birthdate", birthdate);
        localStorage.setItem("languages", languages);
        localStorage.setItem("address", address);



    }


    return (
        <>
            {/* <!-- TableFor Data --> */}
            <div className={`${style["TableData"]}`}>
                <div className={`${style["TableDataContent"]}`}>

                    <Link href='information'>
                        <button className='btn btn-danger mx-3' >ADD</button>
                    </Link>
                    <div className={`${style["container"]} container`}>

                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">id</th>
                                    <th scope="col">Firstname</th>
                                    <th scope="col">Lastname</th>
                                    <th scope="col">Mobile</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Birthdate</th>
                                    <th scope="col">Education</th>
                                    <th scope="col">Language</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Salary</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data && data.map((item) =>
                                        <tr>
                                            <th scope="row">{item._id}</th>
                                            <td><img src={`${process.env.NEXT_PUBLIC_API_URL}/static/` + item.image} style={{ width: 100, height: 100, border: "2px solid black", borderRadius: 20 }} alt="image" /></td>
                                            <td>{item.firstname}</td>
                                            <td>{item.lastname}</td>
                                            <td>{item.mobile}</td>
                                            <td>{item.gender}</td>
                                            <td>{item.email}</td>
                                            <td>{item.address}</td>
                                            <td>{item.birthdate}</td>
                                            <td>{item.education}</td>
                                            <td>{item.languages}</td>
                                            <td>1lakh</td>
                                            <td>
                                                <Link href={'/information2'}> <button className='btn ' onClick={() => Updatehandler(item)}><MdEdit /></button>
                                                </Link><button className='btn ' onClick={() => DeleteHandler(item._id)}><MdOutlineDelete /></button>
                                            </td>
                                        </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* <!-- TableFor DAta --> */}
        </>
    );
}
export default AdminTable;

import React, { useEffect, useState } from 'react';
import style from "../styles/admin.module.css";
import Link from 'next/link'; import axios from 'axios';
import { useRouter } from 'next/router';



const AdminTable = () => {
    // const { data } = props.data
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
                                            <td><img src={"http://localhost:3000/static/" + item.image} style={{ width: 100, height: 100, border: "2px solid black", borderRadius: 20 }} alt="image" /></td>
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
                                                <a href="/information"> <button className='btn btn-success'  >Update</button></a>
                                                <button className='btn btn-danger mx-3' onClick={() => DeleteHandler(item._id)}>Delete</button>
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

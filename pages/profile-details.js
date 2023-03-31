import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import moment from "moment";

const ProfileDetails = () => {
  const [data, setdata] = useState([]);
  const router = useRouter()
  let id = router.query.id
  console.log(router)
  useEffect(() => {
    console.log("ID", id)
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/information?id=${id}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    },)
      .then((res) => {
        setdata(res.data.data)
        console.log("response", res.data.data)
      })
  }, []);

  return (
    <>
      <section style={{ "background-color": "#eee;", "height": "100vh;" }}>
        <div className="container py-5">
          <div className="row">
            <div className="col">
              <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item"><a href="/login">Home</a></li>
                  <li className="breadcrumb-item"><a href="/profile">Profile</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Profile Details</li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img src={`${process.env.NEXT_PUBLIC_API_URL}/static/${data.image}`} alt="avatar"
                    className="rounded-circle img-fluid" style={{ "width": "150px" }} />
                  <h5 className="my-3">{data.firstname}</h5>
                  <p className="text-muted mb-1">Full Stack Developer</p>
                  <p className="text-muted mb-4">Contact:{data.mobile}</p>
                  <div className="d-flex justify-content-center mb-2">
                    <button type="button" className="btn btn-primary">Follow</button>
                    <button type="button" className="btn btn-outline-primary ms-1">Message</button>
                  </div>
                </div>
              </div>

            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">First Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{data.firstname}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Last Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{data.lastname}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{data.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Mobile</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{data.mobile}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Gender</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{data.gender}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Birthday</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{moment(`${data.birthdate}`).utc().format('YYYY-MM-DD')}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Languages</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{data.languages}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Education</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{data.education}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Salary</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">1 lakhs</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Address</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{data.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

    </>
  );
}


export default ProfileDetails;

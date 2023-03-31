// import Image from "next/image";
import React from "react";
import styles from '..//styles/profile.module.css'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';

const Profile = (props) => {
  const { posts } = props
  const router = useRouter()
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("type")
    
    router.push("/login")
    // setUser({ value: null })
    // setKey(Math.random())
  }
  return (
    <>
      <div className="container mt-3 ">
        <div className={` ${styles["btn-login"]}`}>
          <button type="button" className="btn btn-primary me-3">Login</button>

          <button onClick={logout} type="button" className="btn btn-primary">Logout</button>
        </div>
        <div className="row">
          {
            posts.data.map((item, index) =>
              <div className="col-md-4" key={index}>

                <div className="card me-2 mb-2">
                  <Image
                    className="card-img-top img-set"
                    src={`${process.env.NEXT_PUBLIC_API_URL}/static/${item.image}`}
                    height={250}
                    width={250}
                    alt="Card image"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />

                  <div className="card-body">
                    <h4 className="card-title">{item.firstname}</h4>
                    <p className="card-text">
                      Next-Js Websigner
                    </p>
                    <Link href={`/profile-details?id=${item._id}`} className="btn btn-primary">
                      See Profile
                    </Link>
                  </div>
                </div>
              </div>

            )
          }

        </div>
      </div>
    </>
  );
};
export async function getStaticProps() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/information`)
  const posts = await res.json()


  return {
    props: {
      posts,
    },
  }
}


export default Profile;

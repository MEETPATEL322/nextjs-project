import React from 'react';
import style from '../styles/admin.module.css'
import { useRouter } from 'next/router';


const AdminNavbar = () => {
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
            <div className={`${style["main-header"]}`}>
                {/* <!-- Logo --> */}
                <div className={`${style["logo-header"]}`}>
                    <a href="" className={`text-center ${style["logo"]}`}>
                        <h2 className={`${style["Heading"]}`}>Deatils Information</h2>
                    </a>
                </div>
                {/* <!-- Logo --> */}

                {/* navbar-header */}
                <nav className={`navbar navbar-expand-lg ${style["navbar-header"]}`}>
                    <div className="container-fluid">
                        <ul className="navbar-nav topbar-nav ml-md-auto align-items-center justify-content-end w-100">
                            <li className={`nav-item ${style["LogoutBtn"]} ${style["tx-222D39"]}`} onClick={logout}> LogOut</li>
                        </ul>
                    </div>
                </nav>
                {/* navbar-header */}
            </div>
            {/* <!-- Sidebar --> */}
            <div className={`${style["sidebar"]} ${style["sidebar-style-2"]}`}>
                <div
                    className={`${style["sidebar-wrapper"]} ${style["scrollbar-inner"]} ${style["scrollbar"]}`}
                >
                    <div className={`${style["sidebar-content"]}`}>
                        <ul
                            className={`pt-2 nav nav-primary ${style["nav"]} ${style["nav-primary"]}`}
                        >
                            <li className={`nav-item ${style["nav-item"]} `}>
                                <a href="/admin">
                                    <p className={`${style["tx-222D39"]} `}>1. Information</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* <!-- End Sidebar --> */}
        </>
    );
}
export default AdminNavbar;
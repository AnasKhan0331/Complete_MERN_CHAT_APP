import React from 'react'
import logo from "../../public/assets/images/logo.png"
const AuthLayout = ({ children }) => {
    return (
        <>
            <div className='flex justify-center items-center py-3 h-20 shadow-md bg-white' >
                <img src={logo} width={180} height={60} alt="logo" />
            </div>
            {children}

        </>
    )
}

export default AuthLayout

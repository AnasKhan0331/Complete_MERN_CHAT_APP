import React, { useState } from "react";

export const RegisterPage = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        profile_pic: ""
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            };
        });
    };

    return <>
        <div className="mt-5">
            <div className=" bg-white p-4 w-full max-w-sm mx-2 rounded overflow-hidden">
                <h3>Welcome to chat app!</h3>
                <form>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name">Name: </label>
                        <input className="py-1 px-2 bg-slate-200 focus:outline-primary" type="text" id="name" name="name" placeholder="enter your name" onChange={handleChange} value={data.name} required />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="name">Name: </label>
                        <input className="py-1 px-2 bg-slate-200 focus:outline-primary" type="text" id="name" name="name" placeholder="enter your name" onChange={handleChange} value={data.name} required />
                    </div>
                </form>
            </div>
        </div>
    </>;
};

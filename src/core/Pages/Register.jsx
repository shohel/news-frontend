import React from "react";
import Header from "../Elements/Header";
import { useForm } from "react-hook-form";
import {remotePost} from "../RemoteRequest";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit = (submittedData) => {
        const formData = new window.FormData();

        formData.append('name', submittedData.name);
        formData.append('email', submittedData.email);
        formData.append('password', submittedData.password);

        const saveConnectionRequest = remotePost(
            siteData.apiBaseURL+'register',
            formData
        ).then(function (response) {
            if (response.status) {
                localStorage.setItem('currentUser', JSON.stringify(response.user));
                navigate('/');
            }
        });
    }

    return(
        <>

            <Header />

            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">

                <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create your account</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Save your personal preference by creating an account
                        </p>
                    </div>

                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            {...register("name")}
                                        />
                                    </div>

                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            {...register("email", { required: "Email Address is required", pattern: {
                                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                    message: 'Please enter a valid email',
                                                } })}
                                        />
                                    </div>

                                    {errors?.email?.message &&
                                        <p className="text-amber-500 text-xs mt-2 w-fit">
                                            {errors?.email?.message}
                                        </p>
                                    }

                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="password"
                                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            {...register("password", { required: "Password is required" })}
                                        />
                                    </div>

                                    {errors?.password?.message &&
                                        <p className="text-amber-500 text-xs mt-2 w-fit">
                                            {errors?.password?.message}
                                        </p>
                                    }
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Create Account
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Register;
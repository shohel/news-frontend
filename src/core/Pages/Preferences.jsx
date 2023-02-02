import React from "react";
import Header from "../Elements/Header";
const Preferences = () => {
    return (

        <>

            <Header />

            <div className="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">




                <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Preferences</h2>
                    <p className="mt-1 mb-6 text-center text-sm text-gray-500">
                        Adjust settings to personalize your experience on this platform.
                    </p>


                    <form className="space-y-8 divide-y divide-gray-200">
                        <div className="space-y-8 divide-y divide-gray-200">

                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

                                <div className="sm:col-span-3">


                                    <div className="pt-8">
                                        <div>
                                            <h3 className="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                We'll always let you know about important changes, but you pick what else you want to hear about.
                                            </p>
                                        </div>
                                        <div className="mt-6">
                                            <fieldset>
                                                <legend className="sr-only">By Email</legend>
                                                <div className="text-base font-medium text-gray-900" aria-hidden="true">
                                                    By Email
                                                </div>
                                                <div className="mt-4 space-y-4">
                                                    <div className="relative flex items-start">
                                                        <div className="flex h-5 items-center">
                                                            <input
                                                                id="comments"
                                                                name="comments"
                                                                type="checkbox"
                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                            />
                                                        </div>
                                                        <div className="ml-3 text-sm">
                                                            <label htmlFor="comments" className="font-medium text-gray-700">
                                                                Comments
                                                            </label>
                                                            <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </fieldset>

                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-3">

                                    <div className="pt-8">
                                        <div>
                                            <h3 className="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                We'll always let you know about important changes, but you pick what else you want to hear about.
                                            </p>
                                        </div>
                                        <div className="mt-6">
                                            <fieldset>
                                                <legend className="sr-only">By Email</legend>
                                                <div className="text-base font-medium text-gray-900" aria-hidden="true">
                                                    By Email
                                                </div>
                                                <div className="mt-4 space-y-4">
                                                    <div className="relative flex items-start">
                                                        <div className="flex h-5 items-center">
                                                            <input
                                                                id="comments"
                                                                name="comments"
                                                                type="checkbox"
                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                            />
                                                        </div>
                                                        <div className="ml-3 text-sm">
                                                            <label htmlFor="comments" className="font-medium text-gray-700">
                                                                Comments
                                                            </label>
                                                            <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </fieldset>

                                        </div>
                                    </div>

                                </div>

                            </div>




                        </div>

                        <div className="pt-5">
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>



                </div>




            </div>
        </>
    )
}

export default Preferences;
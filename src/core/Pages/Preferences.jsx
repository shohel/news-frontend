import React, {useEffect, useState} from "react";
import Header from "../Elements/Header";
import {remoteGet, remotePost} from "../RemoteRequest";
import {currentUser} from "../HelperFunctions";
import {useForm} from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Preferences = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(true);
    const [authors, setAuthors] = useState([]);
    const [sources, setSources] = useState([]);
    const [preference, setPreference] = useState({});
    const loggedUser = currentUser();

    useEffect(() => {
        setLoading(true);
        remoteGet(
            siteData.apiBaseURL+`preferences`,
            {'Authorization': `Bearer ${loggedUser?.token}`},
        ).then(function (response) {
            if (response.status) {
                setAuthors(response.results.authors);
                setSources(response.results.sources);
                setPreference(JSON.parse(response.results.preference));
            }

            setLoading(false);
        });

    }, []);

    /**
     * Convert array number as string to number
     */
    if (Array.isArray(preference?.authors) && preference?.authors?.length ) {
        preference.authors = preference.authors.map(val => Number(val));
    } else {
        preference.authors = [];
    }

    if ( Array.isArray(preference?.sources) && preference?.sources?.length ) {
        preference.sources = preference.sources.map(val => Number(val));
    } else {
        preference.sources = [];
    }

    const onSubmit = (submittedData) => {
        const savePreference = remotePost(
            siteData.apiBaseURL+'preferences',
            JSON.stringify(submittedData),
            {'Authorization': `Bearer ${loggedUser?.token}`, 'Content-Type': 'application/json'}
        );

        toast.promise(savePreference, {
            pending: `Saving...`,
            success: `Preferences has been saved`,
            error: `Something went wrong, please try again`,
        });
    }

    return (
        <>
            <div className="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">


                <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Preferences</h2>
                    <p className="mt-1 mb-8 text-center text-sm text-gray-500">
                        Adjust settings to personalize your experience on this platform.
                    </p>

                    <hr />

                    <form className="space-y-8 divide-y divide-gray-200" method="post" onSubmit={handleSubmit(onSubmit)}>

                        <div className="space-y-8 divide-y divide-gray-200">

                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

                                <div className="sm:col-span-3">


                                    <div className="pt-8">
                                        <div>
                                            <h3 className="text-lg font-medium leading-6 text-gray-900">Authors</h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                I would like to read news only from the authors listed below.
                                            </p>
                                        </div>
                                        <div className="mt-6">
                                            <fieldset>
                                                {!loading &&
                                                    <div className="text-base text-gray-500" aria-hidden="true">
                                                        {`${authors.length} authors`}
                                                    </div>
                                                }

                                                <div className="mt-4 space-y-4">
                                                    {loading &&
                                                        <Skeleton count={10} />
                                                    }

                                                    {authors.map((author) => {
                                                        return(
                                                            <div key={author.author_slug} className="relative flex items-start">
                                                                <div className="flex h-5 items-center">
                                                                    <input
                                                                        id={`author_check_${author.id}`}
                                                                        type="checkbox"
                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        value={author.id}
                                                                        {...register("authors")}
                                                                        defaultChecked={preference?.authors?.includes(author.id)}
                                                                    />
                                                                </div>
                                                                <div className="ml-3 text-sm">
                                                                    <label htmlFor={`author_check_${author.id}`} className="font-medium text-gray-700">
                                                                        {author.author_name}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}


                                                </div>
                                            </fieldset>

                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-3">

                                    <div className="pt-8">
                                        <div>
                                            <h3 className="text-lg font-medium leading-6 text-gray-900">Sources</h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Show me news only from the sources listed below.
                                            </p>
                                        </div>
                                        <div className="mt-6">
                                            <fieldset>
                                                {!loading &&
                                                    <div className="text-base text-gray-500" aria-hidden="true">
                                                        {`${sources.length} sources`}
                                                    </div>
                                                }
                                                <div className="mt-4 space-y-4">

                                                    {loading &&
                                                        <Skeleton count={10} />
                                                    }

                                                    {sources.map((source) => {
                                                        return(
                                                            <div key={source.source_slug} className="relative flex items-start">
                                                                <div className="flex h-5 items-center">
                                                                    <input
                                                                        id={`source_check_${source.id}`}
                                                                        type="checkbox"
                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        value={source.id}
                                                                        {...register("sources")}
                                                                        defaultChecked={preference?.sources?.includes(source.id)}
                                                                    />
                                                                </div>
                                                                <div className="ml-3 text-sm">
                                                                    <label htmlFor={`source_check_${source.id}`} className="font-medium text-gray-700">
                                                                        {source.source}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}


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

            <ToastContainer />
        </>
    )
}

export default Preferences;
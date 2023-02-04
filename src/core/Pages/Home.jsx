import React, {useState, useEffect} from "react";
import Header from "../Elements/Header";
import {remoteGet, remotePost} from "../RemoteRequest";
import {currentUser} from "../HelperFunctions";
import LoadingItem from "../Elements/LoadingItem";
import {Link} from "react-router-dom";
import {CheckCircleIcon} from "@heroicons/react/24/outline";

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const loggedUser = currentUser();

    useEffect(() => {
        setLoading(true);
        remoteGet(
            siteData.apiBaseURL+`getArticles?page=${page}`,
            {'Authorization': `Bearer ${loggedUser?.token}`},
        ).then(function (response) {
            if (response.status) {
                if ( response.results.data?.length ) {
                    setArticles(articles.concat(response.results.data));
                } else {
                    setHasMore(false);
                }
            }

            setLoading(false);
        });

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);

    }, [page]);

    function handleScroll() {
        if ( ! hasMore ) return;

        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setPage(page + 1);
    }

    const placeholderImage = 'https://via.placeholder.com/1280x720.png?text=No+preview+is+available';

    return(
        <div className="px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">

            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">News</h2>
                <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
                    Read the news online and save the trees.
                </p>
            </div>


            <div>

                <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        First name
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="block rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                </div>


            </div>


            {articles.length ?
                <>

                    <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
                        {articles.map((article) => (
                            <div key={article.id} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                                <div className="flex-shrink-0">
                                    <img className="h-48 w-full object-cover" src={article.url_to_image ? article.url_to_image : placeholderImage } alt="" />
                                </div>
                                <div className="flex flex-1 flex-col justify-between bg-white p-6">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">
                                            <span className="text-gray-500">{article.apiSource} | </span>
                                            {article.source?.id &&
                                                <a href={article.url} className="text-indigo-600 hover:underline" target="_blank">
                                                    {article.source.source}
                                                </a>
                                            }
                                        </p>
                                        <a href={article.url} className="mt-2 block" target="_blank">
                                            <p className="text-xl font-semibold text-gray-900">{article.title}</p>
                                            <p className="mt-3 text-base text-gray-500">{article.description}</p>
                                        </a>
                                    </div>
                                    <div className="mt-6">
                                        <p className="text-sm font-medium text-gray-900">
                                            {article.raw_author}
                                        </p>
                                        <div className="flex space-x-1 text-sm text-gray-500">
                                            <time dateTime={article.published_at}>{article.published_at}</time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {loading && <LoadingItem />}

                    </div>
                </>
                :
                <>
                    {loading ?
                        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
                            <LoadingItem />
                        </div>

                        :

                        <div className="text-center py-16 px-6 sm:py-24 lg:px-8">

                            <CheckCircleIcon className="mx-auto block h-16 w-16 text-center" aria-hidden="true" />

                            <p className="mt-1 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl mb-4">
                                No articles available at this moment
                            </p>

                            <Link to={'/'} className="text-base font-medium text-indigo-700 hover:text-indigo-600">
                                Reload to see new articles <span aria-hidden="true"> &rarr;</span>
                            </Link>

                            { currentUser() &&
                                <p className="mt-4 text-sm text-gray-500">
                                    You can also try by resetting your <Link to={'preferences'} className="text-indigo-700" >preference</Link>
                                </p>
                            }

                        </div>
                    }
                </>
            }
        </div>
    );
}

export default Home;
import React, {useState, useEffect} from "react";
import Header from "../Elements/Header";
import {remoteGet, remotePost} from "../RemoteRequest";
import {currentUser} from "../HelperFunctions";
import LoadingItem from "../Elements/LoadingItem";
import {Link} from "react-router-dom";
import {CheckCircleIcon} from "@heroicons/react/24/outline";
import {AsyncPaginate} from "react-select-async-paginate";

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const loggedUser = currentUser();
    const [searchTerm, setSearchTerm] = useState('');
    const [authors, setAuthors] = useState([]);
    const [sources, setSources] = useState([]);
    const [totalNews, setTotalNews] = useState(0);


    /*
    useEffect(() => {
        remoteGet(
            siteData.apiBaseURL+`filterableFields`,
            {'Authorization': `Bearer ${loggedUser?.token}`},
        ).then(function (response) {
            if (response.status) {
                console.log(response);
            }
        });

    }, []);
*/
    useEffect(() => {
        setLoading(true);

        const authorIds = authors.map( (item) => item.value );
        const sourceIds = sources.map( (item) => item.value );

        remoteGet(
            siteData.apiBaseURL+`getArticles?page=${page}&search=${searchTerm}&authors=${authorIds}&sources=${sourceIds}`,
            {'Authorization': `Bearer ${loggedUser?.token}`},
        ).then(function (response) {
            if (response.status) {
                setTotalNews(response.results?.total);
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

    }, [page, searchTerm, authors, sources]);

    function handleScroll() {
        if ( ! hasMore ) return;

        let currentPosition = window.innerHeight + document.documentElement.scrollTop;
        if ( currentPosition % 1 === 0.5 ) {
            currentPosition += 0.5;
        }

        if (currentPosition !== document.documentElement.offsetHeight) return;
        setPage(page + 1);
    }

    const placeholderImage = 'https://via.placeholder.com/1280x720.png?text=No+preview+is+available';

    async function authorLoadOptions(search, loadedOptions, { page }) {
        const responseJSON = await remoteGet(
            siteData.apiBaseURL+`getAuthors?search=${search}&page=${page}`,
            {'Authorization': `Bearer ${loggedUser?.token}`},
        );

        const options = [];
        responseJSON?.results?.data?.map( resultItem => {
            options.push({ value: resultItem.id, label: resultItem.author_name })
        } );

        return {
            options: options,
            hasMore: ! (responseJSON?.results?.data?.length < responseJSON?.results?.per_page),
            additional: {
                page: page + 1,
            },
        };
    }

    async function sourceLoadOptions(search, loadedOptions, { page }) {
        const responseJSON = await remoteGet(
            siteData.apiBaseURL+`getSources?search=${search}&page=${page}`,
            {'Authorization': `Bearer ${loggedUser?.token}`},
        );

        const options = [];
        responseJSON?.results?.data?.map( resultItem => {
            options.push({ value: resultItem.id, label: resultItem.source })
        } );

        return {
            options: options,
            hasMore: ! (responseJSON?.results?.data?.length < responseJSON?.results?.per_page),
            additional: {
                page: page + 1,
            },
        };
    }

    const onChangeFilter = (value, type) => {
        /**
         * Reset query first.
         */
        setHasMore(true);
        setPage(1);
        setArticles([]);

        switch ( type ) {
            case 'search':
                setSearchTerm(value);
                break;
            case 'authors':
                setAuthors(value)
                break;
            case 'sources':
                setSources(value)
                break;
        }
    }

    const customStyles = {
        control: (provided, state) => {
            return (
                {
                    ...provided,
                    '&:hover': {
                        border: state.isFocused ? '1px solid #2563eb' : '1px solid rgb(209 213 219/1)'
                    },
                    background: '#fff',
                    borderColor: 'rgb(209 213 219/1)',
                    boxShadow: state.isFocused ? null : null,
                    padding: '0.60rem 1rem',
                }
            )
        },

        valueContainer: (provided, state) => ({
            ...provided,
            padding: '0 6px'
        }),

        input: (provided, state) => ({
            ...provided,
            margin: '0px',
            'input:focus': {
                boxShadow: 'none',
            },
        }),
        indicatorSeparator: state => ({
            display: 'none',
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            height: '30px',
        }),
    };

    let searchDelay = null;
    const searchNewsHandler = (e) => {
        if (searchDelay) {
            clearTimeout(searchDelay);
        }

        searchDelay = setTimeout(() => {
            onChangeFilter(e.target.value, 'search');
        }, 1000);
    }
    
    return(
        <div className="px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">

            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">News</h2>
                <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
                    Read the news online and save the trees.
                </p>
            </div>


            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 sm:gap-x-8">

                <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        Search News
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder={'Search news...'}
                            onChange={searchNewsHandler}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        Filter by Authors
                    </label>
                    <div className="mt-1">
                        <AsyncPaginate
                            value={authors}
                            loadOptions={authorLoadOptions}
                            onChange={(selectedValue) => {
                                onChangeFilter(selectedValue, 'authors');
                            }}
                            additional={{
                                page: 1,
                            }}
                            isMulti={true}
                            styles={customStyles}
                            placeholder={<div>Select or type to search author</div>}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        Filter by Source
                    </label>
                    <div className="mt-1">
                        <AsyncPaginate
                            value={sources}
                            loadOptions={sourceLoadOptions}
                            onChange={(selectedValue) => {
                                onChangeFilter(selectedValue, 'sources');
                            }}
                            additional={{
                                page: 1,
                            }}
                            isMulti={true}
                            styles={customStyles}
                            placeholder={<div>Select or type to search source</div>}
                        />
                    </div>
                </div>
            </div>

            <p className="mt-4 text-gray-500 text-sm"> {`Total ${totalNews} news found in this search criteria`} </p>

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
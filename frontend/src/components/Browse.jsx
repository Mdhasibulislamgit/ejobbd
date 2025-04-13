import { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { Search, X } from 'lucide-react';
import { Button } from './ui/button';

const Browse = () => {
    const { isLoading, error } = useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [localQuery, setLocalQuery] = useState(searchedQuery);
    const dispatch = useDispatch();

    // Update local query when searchedQuery changes (from other components)
    useEffect(() => {
        setLocalQuery(searchedQuery);
    }, [searchedQuery]);

    // Clear search query when component unmounts
    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [dispatch])

    // Handle local search
    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setSearchedQuery(localQuery));
    }

    // Clear search
    const clearSearch = () => {
        setLocalQuery('');
        dispatch(setSearchedQuery(''));
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 px-4'>
                {/* Search bar */}
                <div className='mb-8'>
                    <form onSubmit={handleSearch} className='flex items-center gap-2 max-w-2xl mx-auto'>
                        <div className='flex-1 relative'>
                            <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' />
                            <input
                                type='text'
                                placeholder='Refine your search...'
                                value={localQuery}
                                onChange={(e) => setLocalQuery(e.target.value)}
                                className='w-full h-12 pl-12 pr-10 rounded-lg border-2 border-purple-200 focus:border-purple-500 outline-none transition-colors'
                            />
                            {localQuery && (
                                <button
                                    type='button'
                                    onClick={clearSearch}
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                                >
                                    <X className='w-5 h-5' />
                                </button>
                            )}
                        </div>
                        <Button
                            type='submit'
                            disabled={isLoading}
                            className='h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 rounded-lg text-white font-semibold transition-all'
                        >
                            {isLoading ? 'Searching...' : 'Search'}
                        </Button>
                    </form>
                </div>

                {/* Search query display */}
                {searchedQuery && (
                    <div className='text-center mb-6'>
                        <p className='text-gray-600'>Showing results for <span className='font-semibold text-purple-700'>'{searchedQuery}'</span></p>
                    </div>
                )}

                {/* Error state */}
                {error && (
                    <div className='text-center py-10'>
                        <div className='text-red-500 mb-4'>{error}</div>
                        <p className='text-gray-600'>Please try another search or check your connection.</p>
                    </div>
                )}

                {/* Loading state */}
                {isLoading ? (
                    <div className='text-center py-10'>
                        <div className='inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4'></div>
                        <p className='text-gray-600'>Loading jobs...</p>
                    </div>
                ) : (
                    <>
                        <h1 className='font-bold text-xl my-6'>Search Results ({allJobs.length})</h1>

                        {/* No results state */}
                        {allJobs.length === 0 && !isLoading && !error ? (
                            <div className='text-center py-10 bg-gray-50 rounded-lg'>
                                <div className='text-4xl mb-4'>🔍</div>
                                <h2 className='text-xl font-semibold mb-2'>No jobs found</h2>
                                <p className='text-gray-600 mb-4'>Try different keywords or browse all available jobs</p>
                                <Button
                                    onClick={clearSearch}
                                    className='bg-purple-600 hover:bg-purple-700'
                                >
                                    View All Jobs
                                </Button>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                {allJobs.map((job) => (
                                    <Job key={job._id} job={job}/>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Browse
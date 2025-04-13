import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {searchedQuery} = useSelector(store=>store.job);

    useEffect(()=>{
        const fetchAllJobs = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`);
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));
                } else {
                    setError('Failed to fetch jobs');
                    toast.error('Failed to fetch jobs');
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setError(error.message || 'An error occurred while fetching jobs');
                toast.error(error.response?.data?.message || 'An error occurred while fetching jobs');
            } finally {
                setIsLoading(false);
            }
        }

        fetchAllJobs();
    },[searchedQuery, dispatch])

    return { isLoading, error };
}

export default useGetAllJobs
import  { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Search, TrendingUp, X } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'


const HeroSection = () => {
    const [query, setQuery] = useState("")
    const [jobCount, setJobCount] = useState(0)
    const [isSearching, setIsSearching] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const target = 10000
        const increment = target / 100
        const timer = setInterval(() => {
            setJobCount(prev => {
                if (prev >= target) {
                    clearInterval(timer)
                    return target
                }
                return Math.floor(prev + increment)
            })
        }, 20)
        return () => clearInterval(timer)
    }, [])

    // Handle input changes
    const handleInputChange = (e) => {
        const value = e.target.value
        setQuery(value)
    }

    // Clear the search input
    const clearSearch = () => {
        setQuery('')
    }

    // Handle search submission
    const searchJobHandler = async (e) => {
        e.preventDefault()

        if (query.trim() === '') {
            toast.error('Please enter a search term')
            return
        }

        setIsSearching(true)

        try {
            dispatch(setSearchedQuery(query))
            navigate("/browse")
        } catch (error) {
            toast.error('An error occurred while searching')
            console.error(error)
        } finally {
            setIsSearching(false)
        }
    }

    return (
        <div className="min-h-[90vh] bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50 flex items-center relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-20 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                <div className="absolute top-40 right-20 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-40 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
            </div>

            <div className="container mx-auto px-4 z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-left space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-semibold animate-pulse">
                            <TrendingUp className="w-5 h-5" />
                            Over {jobCount.toLocaleString()} jobs available
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Find Your Dream Career Today
                        </h1>
                        <p className="text-gray-600 text-xl max-w-2xl">
                            Connect with top employers and discover opportunities that match your skills and aspirations. Your next career move starts here.
                        </p>
                        <form onSubmit={searchJobHandler} className="flex items-center gap-2 max-w-2xl">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search for jobs (e.g. Frontend Developer)"
                                    value={query}
                                    onChange={handleInputChange}
                                    className="w-full h-12 pl-12 pr-10 rounded-lg border-2 border-purple-200 focus:border-purple-500 outline-none transition-colors"
                                />
                                {query && (
                                    <button
                                        type="button"
                                        onClick={clearSearch}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                            <Button
                                type="submit"
                                disabled={isSearching}
                                className="h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 rounded-lg text-white font-semibold transition-all transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSearching ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Searching...
                                    </span>
                                ) : 'Search'}
                            </Button>
                        </form>
                    </div>
                    <div className="hidden lg:block">
                        <div className="relative w-full h-[600px]">
                            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-80">
                                <path fill="#8B5CF6" d="M45.7,-78.3C58.9,-71.9,69.3,-58.7,76.4,-44.1C83.5,-29.5,87.3,-14.7,86.9,-0.2C86.5,14.3,81.9,28.6,74.7,41.7C67.5,54.8,57.6,66.7,44.7,74.7C31.8,82.7,15.9,86.8,0.2,86.5C-15.5,86.2,-31,81.5,-44.8,73.8C-58.6,66.1,-70.7,55.4,-78.3,42.1C-85.9,28.8,-89,14.4,-88.2,0.5C-87.4,-13.4,-82.7,-26.8,-75.6,-39.1C-68.5,-51.4,-59,-62.6,-46.6,-69.3C-34.2,-76,-17.1,-78.2,-0.1,-78.1C16.9,-77.9,33.8,-75.4,45.7,-78.3Z" transform="translate(100 100)" />
                            </svg>
                            <img
                                src="/hero-illustration.svg"
                                alt="Job Search Illustration"
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
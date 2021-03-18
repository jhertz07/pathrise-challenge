import {useState, useEffect} from 'react'
import Job from './Job.js'

function Wishlist() {
    const storage = window.localStorage;

    const [modalActive, setModalActive] = useState("hidden");
    const [jobTitle, setJobTitle] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [jobs, setJobs] = useState([])

    // effect for first render only
    useEffect(() => {
        let jobsArr = []
        for (var i = 0; i < storage.length; i++) {
            jobsArr.push(JSON.parse(storage.getItem(storage.key(i))))
        }
        setJobs(jobsArr)
    }, [])

    function handleNewJob() {
        setModalActive("hidden")
        let job = {
            'companyName' : companyName,
            'jobTitle' : jobTitle,
            'date' : Date.now(),
            'color': "#" + Math.floor(Math.random()*16777215).toString(16),
            'key' : Math.random()
        }
        console.log(job)
        storage.setItem(job.key, JSON.stringify(job))
        setJobTitle("")
        setCompanyName("")

        let newJobsArr = jobs
        newJobsArr.push(job)
        setJobs(newJobsArr)
    }

    function deleteJob(key) {
        storage.removeItem(key)
        let jobsArr = []
        for (var i = 0; i < storage.length; i++) {
            jobsArr.push(JSON.parse(storage.getItem(storage.key(i))))
        }
        setJobs(jobsArr)
    }

    return (
        <div className="flex justify-center">
            <div className="flex flex-col justify-center items-center mt-8">
                <div className="text-xl font-sans font-semibold">
                    WISHLIST
                </div>
                <div className="pb-4 font-semibold text-md text-gray-500">
                    {jobs.length} JOBS
                </div>
                <button onClick={() => setModalActive("fixed")} className="flex justify-center items-center w-56 h-8 bg-white shadow rounded-sm">
                    <span className="text-gray-500 font-bold text-xl">
                        +
                    </span>
                </button>
                <div>
                    {
                    jobs.map((job) => {
                        return (<Job deleteJob={() => deleteJob(job.key)} data={job} key={job.key}></Job>)
                    })
                    }
                </div>
            </div>
            <div onClick={() => setModalActive("hidden")} className={"w-screen h-screen bg-gray-800 bg-opacity-75 " + 
                modalActive}>
                    <div onClick={(e) => e.stopPropagation()} className="absolute top-20 left-0 right-0 ml-auto mr-auto text-center w-72 h-72 bg-white rounded-md shadow p-2">
                        <div className="font-sans text-2xl font-semibold py-4">
                            Add a job
                        </div>
                        <input type="text" value={companyName} placeholder="Company Name" onChange={(e) => setCompanyName(e.target.value)}
                        className="px-1 mt-4 w-4/5 h-10 border border-gray-200 rounded-md">
                        </input>
                        <input type="text" value={jobTitle} placeholder="Job Title" onChange={(e) => setJobTitle(e.target.value)}
                        className="px-1 mt-4 w-4/5 h-10 border border-gray-200 rounded-md">
                        </input>
                        <button onClick={() => handleNewJob()}
                        className="mt-6 w-4/5 h-10 bg-purple-600 rounded-lg text-white font-medium">
                            <span>Continue</span>
                        </button>
                    </div>
            </div>
        </div>
    )
}

export default Wishlist
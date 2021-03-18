import trashIcon from './icons/trash-solid.svg'
import {useState} from 'react'

function Job(props) {

    const [deleteModal, setDeleteModal] = useState("hidden")
    
    return(
        <div className="group w-72 h-20 my-2 rounded-md shadow-sm" style={{backgroundColor: props.data.color}}>
            <div className="relative w-full h-full flex flex-col items-start justify-center px-4">
                <div className="text-white font-medium">
                    {props.data.companyName}
                </div>
                <div className="text-gray-200 font-thin">
                    {props.data.jobTitle}
                </div>
                <div className="self-end text-sm text-gray-200 font-normal">
                    added {Math.floor((Date.now() - props.data.date)/1000/60)} minutes ago
                </div>
                <div onClick={() => setDeleteModal("fixed")}
                className="hidden group-hover:flex cursor-pointer w-7 h-7 absolute top-2 right-2 bg-gray-300 hover:bg-gray-500 rounded-full justify-center items-center">
                    <img className="w-1/2" src={trashIcon} />
                </div>
            </div>
            <div className={"w-screen h-screen bg-gray-800 bg-opacity-75 fixed top-0 left-0 z-10 " + 
                deleteModal}>
                    <div onClick={(e) => e.stopPropagation()} className="absolute top-20 left-0 right-0 ml-auto mr-auto text-center w-72 h-72 bg-white rounded-md shadow p-2">
                        <div className="font-sans text-2xl font-semibold pt-6">
                            Delete Job
                        </div>
                        <button onClick={props.deleteJob}
                        className="mt-6 w-4/5 h-10 bg-purple-600 rounded-lg text-white font-medium">
                            <span>Continue</span>
                        </button>
                        <button onClick={() => setDeleteModal("hidden")}
                        className="mt-6 w-4/5 h-10 bg-gray-600 rounded-lg text-white font-medium">
                            <span>Cancel</span>
                        </button>
                    </div>
            </div>
        </div>
    )
}

export default Job
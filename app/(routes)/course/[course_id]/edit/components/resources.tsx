import React, { useEffect } from 'react'
import Image from 'next/image'
import { FaDownload } from 'react-icons/fa'
import { IoMdAddCircle } from "react-icons/io";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle, 
  } from "@/components/ui/dialog"
import ResourceUploader from './resourceUploader';
import { useGlobalState } from '../stateContext';


const  Resources:React.FC = () => {
     const { 
        lessons,
        setLessons,
        videolink,
        setVideoLink,
        selectedLesson,
        setSelectedLesson,
        isVideoUploaderOpen,
        setIsVideoUploaderOpen,
        isResourceUploaderOpen,
        setIsResourceUploaderOpen,
        resources,
        setResources
      } = useGlobalState();

      useEffect(() => {
        const fetchResources = async () => {
          if (!selectedLesson) return;
          const res = await fetch(`/api/lesson/${selectedLesson._id}/resource`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          setResources(data);
        };
        fetchResources();
      }, [selectedLesson]);

    return (
          <div className="p-4">
            <h4 className="text-lg font-semibold mb-2">Resources</h4>
            <div className="flex justify-center items-center">
                <div className="grid lg:grid-cols-3 w-full">
                    {resources.map((resource: any) => (
                        <div key={resource._id} className="bg-white rounded-xl m-2 p-4 flex flex-col col-span-1 items-start justify-between mb-4">
                            <div className="flex items-center w-full mb-2">
                                <Image
                                    src={`/icons/files/${resource.type}.png`}
                                    alt={`${resource.type} file`}
                                    width={40}
                                    height={40}
                                />
                                <span className="flex-grow ml-4 text-gray-600">{resource.name}</span>
                                <a
                                    href={resource.url}
                                    download
                                    className="flex bg-blue-500 text-white items-center  p-3 rounded-full hover:bg-blue-600 transition"
                                >
                                    <FaDownload/>
                                </a>
                            </div>
                            <div className="w-full">
                                <h5 className="text-md font-semibold">{resource.title}</h5>
                                <p className="text-sm text-gray-500">{resource.description}</p>
                            </div>
                        </div>
                    ))}
                    <div className='bg-white w-full justify-center items-center flex min-h-16 hover:opacity-75' 
                        onClick={()=>setIsResourceUploaderOpen(true)}>
                            <IoMdAddCircle className='text-4xl'/>
                    </div>
                    <Dialog open={isResourceUploaderOpen} onOpenChange={setIsResourceUploaderOpen}>
                        <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add your resources here</DialogTitle>
                            <DialogDescription>
                            Please upload a resource file to add a lesson to this course.
                            </DialogDescription>
                        </DialogHeader>
                        <ResourceUploader/>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default Resources

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaDownload } from 'react-icons/fa';
import { useGlobalState } from '../stateContext';
import { Skeleton } from "@/components/ui/skeleton";
import { set } from 'mongoose';

function Resources() {
    const { 
        resources,
        setResources,
        selectedLesson,
    } = useGlobalState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchResources = async () => {
            if (!selectedLesson) return;
            setLoading(true);
            const res = await fetch(`/api/lesson/${selectedLesson._id}/resource`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            setResources(data);
            setLoading(false);
        };
        fetchResources();
    }, [selectedLesson]);

    return (
        <div className="p-4">
            <h4 className="text-lg font-semibold mb-2">Resources</h4>
            <div className="flex justify-center items-center">
                <div className="grid lg:grid-cols-3 w-full">
                    {loading ? (
                        Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="bg-white rounded-xl m-2 p-4 flex flex-col col-span-1 items-start justify-between mb-4">
                                <Skeleton className="w-full h-10 mb-2" />
                                <Skeleton className="w-full h-6 mb-2" />
                                <Skeleton className="w-full h-4" />
                            </div>
                        ))
                    ) : (
                        resources.map((resource: any) => (
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
                                        className="flex bg-blue-500 text-white items-center p-3 rounded-full hover:bg-blue-600 transition"
                                    >
                                        <FaDownload />
                                    </a>
                                </div>
                                <div className="w-full">
                                    <h5 className="text-md font-semibold">{resource.title}</h5>
                                    <p className="text-sm text-gray-500">{resource.description}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Resources;

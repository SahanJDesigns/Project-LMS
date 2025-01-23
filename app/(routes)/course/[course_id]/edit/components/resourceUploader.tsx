import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useGlobalState } from '../stateContext';
import { Progress } from "@/components/ui/progress"

const ResourceUploader: React.FC = () => {
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
        setIsResourceUploaderOpen
    } = useGlobalState();

    const [uploadProgress, setUploadProgress] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dropedFile, setDropedFile] = useState<File | null>(null);
    const [fileDropped, setFileDropped] = useState(false);
    const [filePreview, setFilePreview] = useState<string | ArrayBuffer | null>(null);
    const [fileName, setFileName] = useState('');
   

    const onClickSubmit = async () => {
        const formData = new FormData();
        formData.append('lesson_id', selectedLesson._id);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('file', dropedFile as Blob);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/upload/resource', true);

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100;
                setUploadProgress(percentComplete);
            }
        };

        xhr.onload = () => {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.response);
                const lesson = JSON.parse(data);

                setUploadProgress(0);
                setLessons((prevLessons) => {
                    const updatedLessons = prevLessons.map((l) => l._id === lesson._id ? lesson : l);
                    return updatedLessons;
                });
                setSelectedLesson(lesson);
                setIsVideoUploaderOpen(false);
                setIsResourceUploaderOpen(false);
            } else {
                console.error('Upload failed');
            }
        };

        xhr.onerror = () => {
            console.error('Upload failed');
        };

        xhr.send(formData);
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        setDropedFile(file);
        setFileDropped(true);
        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = () => {
            setFilePreview(reader.result);
        };
        reader.readAsDataURL(file);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div>
            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>
            
            <div className="mt-4">
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>

            {!fileDropped && (
                <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer">
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the files here ...</p>
                    ) : (
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    )}
                </div>
            )}

            {fileDropped && filePreview && (
                <div className="mt-4">
                    <img src={filePreview as string} alt="Preview" className="w-full h-auto" />
                    <p>{fileName}</p>
                </div>
            )}

            <button
                onClick={onClickSubmit}
                className="mt-4 bg-blue-500 text-white p-2 rounded"
            >
                Submit
            </button>
            {uploadProgress > 0 && (
                <div className="mt-4">
                    <Progress value={uploadProgress} max={100} />
                    <span>{Math.round(uploadProgress)}%</span>
                </div>
            )}
        </div>
    );
};

export default ResourceUploader;
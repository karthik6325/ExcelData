import React, { useState } from "react";
import axios from "axios";
import "./homepage.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import toast from 'react-hot-toast'

const Homepage = () => {
    const [xlsxFile, setXlsxFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [fileChosen, setFileChosen] = useState(false); 
    const [uploadSuccess, setUploadSuccess] = useState(false); 

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setXlsxFile(file);
        setFileName(truncateFileName(file.name));
        setFileChosen(true); 
    };

    const truncateFileName = (name) => {
        const maxLength = 15;
        if (name.length <= maxLength) {
            return name;
        } else {
            return name.substring(0, maxLength) + "..";
        }
    };

    const handleFileSubmit = () => {
        if (!xlsxFile) {
            toast('Please select a file');
            return;
        }
        else {
            toast.success('File sent successfully');
        }

        const formData = new FormData();
        formData.append('xlsx', xlsxFile);

        axios.post('http://localhost:3001/api/v1/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                if (response.status === 200) {
                    toast.success('File uploaded successfully');
                    setUploadSuccess(true); 
                } else {
                    toast.error('Failed to upload file');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error('Failed to upload file');
            });
    };

    return (
        <div className="homepage">
            <div className="add-from-excel">
                <p>Add from Excel</p>
            </div>
            <div className="container">
                <p className="candidate_text">Add candidates to database</p>
                <div className="button-container">
                    <input
                        type="file"
                        accept=".xlsx"
                        onChange={handleFileUpload}
                        id="imageInput"
                        style={{ display: 'none' }}
                    />
                    {uploadSuccess ? (
                        <p className="thank-you-text">
                            <span className="green-text">Thank you,</span><br />
                            <span> <span className="green-tick">&#10004;</span> file successfully uploaded</span><br />
                            <span>your record will be processed shortly</span>
                        </p>

                    ) : (
                        <>
                            <label htmlFor="imageInput" className="upload-button">
                                <IoCloudUploadOutline className="cloud-icon" />
                            </label>
                            {fileChosen ? (
                                <>
                                    {fileName && <p className="fileName">{fileName}</p>}
                                    <button onClick={handleFileSubmit} className="postButton">
                                        Upload File
                                    </button>
                                </>
                            ) : (
                                <p>Upload a .xlsx or .xls file here</p>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Homepage;

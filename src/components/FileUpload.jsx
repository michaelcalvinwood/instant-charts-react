import './FileUpload.scss';
import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const FileUpload = () => {
    
    const uploadFiles = files => {
        const fd = new FormData();
        console.log(files);
        files.forEach(file =>fd.append('File[]',file));
        const config = {  };

        const request = {
            url: `https://charts.pymnts.com:6300/csv`,
            method: 'post',
            data: fd,
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        axios(request)
        .then((response) => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        })
    }

    return (
        <div className="file-upload">
            <select id="chartType" name = "chartType" className='file-upload--select'>
                <option value="bar">&nbsp;Bar</option>
                <option value="line">&nbsp;Line</option>
                <option value="pie">&nbsp;Pie</option>
            </select>
           <div 
                className="dropzone-container"
                style={{cursor: 'pointer', lineHeight: '1.3', padding: ".25rem .5rem", margin: '1rem auto 0 auto', width: '80%', display: 'block', height: '4rem', border: '2px solid blue', borderRadius: '4px'}}
                
            >
            <Dropzone 
                onDrop={acceptedFiles => uploadFiles(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here.<br /> Or click to select files</p>
                        </div>
                        </section>
                    )}
                </Dropzone>
           </div>
        </div>
        
    )
}

export default FileUpload;
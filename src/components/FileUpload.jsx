import './FileUpload.scss';
import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const FileUpload = ({chart, setChart, setCsv}) => {
    
    const uploadFiles = files => {
        const fd = new FormData();
        fd.append('chart', document.getElementById('chartType').value);
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
            setCsv(response.data);
        })
        .catch(error => {
            console.error(error);
            alert('Error: Could not process CSV. Please reformat file.');
            setCsv([]);
        })
    }

    return (
        <div className="file-upload">
            <select id="chartType" name = "chartType" className='file-upload--select' onChange={e => setChart(e.target.value)}>
                <option value="bar">&nbsp;Bar</option>
                <option value="line">&nbsp;Line</option>
                <option value="pie">&nbsp;Pie</option>
            </select>
           <div className="dropzone-container">
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
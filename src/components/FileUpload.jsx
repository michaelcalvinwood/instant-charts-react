import './FileUpload.scss';
import React, { useState, useRef } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const FileUpload = ({chart, setChart, setCsv, setConfig, chartOption}) => {
    const [fileName, setFileName] = useState('');
    const embedCodeRef = useRef();
    const embedButtonRef = useRef();

    const stringify = (obj, token) => JSON.stringify(obj, (key, value) => typeof value === 'function' ? `${token}${value.toString().replaceAll("\n", ' ')}` : value);

    const handleEmbedButton = () => {
        console.log('embed chartOption', chartOption);

        const id = uuidv4();

        const data = {};
        data.option = stringify(chartOption, 'funcxyz_');
        data.title = chartOption.title && chartOption.title.text ? chartOption.title.text : '';
        data.subtitle = chartOption.title && chartOption.title.subtext ? chartOption.title.subtext : '';
        data.meta = ''; // TODO: add support adding and updating meta info for searching later

        const request = {
            url: `https://charts.pymnts.com:6300/id/${id}`,
            method: "post",
            data
        }

        axios(request)
        .then(response => {
            embedButtonRef.current.style.display='none';
            embedCodeRef.current.innerText = `<div class='pymntsChart' id='${id}'></div>`;
        })
        .catch(error => {
            console.error(error);
            alert ('Error: Could not process request. Please try again.');
        })
        
    }
    
    const uploadFiles = files => {
        console.log('files', files);
        embedButtonRef.current.display='block';
        embedCodeRef.current.innerText = '';
        const fd = new FormData();
        //fd.append('chart', document.getElementById('chartType').value);
        console.log(files[0].name);
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

            const csvData = response.data;
            const chartType = csvData[0][0] ? csvData[0][0].toLowerCase() : 'undefined';

            console.log('chartType', chartType);
            return;

            setCsv(response.data);
            setFileName(files[0].name);
            setConfig({
                color: 'Default',
                checked: true,
                title: {
                    text: '',
                    subtext: ''
                }
            })
        })
        .catch(error => {
            console.error(error);
            alert('Error: Could not process CSV. Please reformat file.');
            setCsv([]);
        })
    }

    return (
        <div className="file-upload">
            <h2 className="file-upload--input">Input</h2>
            <div className='file-upload--fileName'>{fileName}</div>
            {/* <select id="chartType" name = "chartType" className='file-upload--select' onChange={e => setChart(e.target.value)}>
                <option value="bar">&nbsp;Bar</option>
                <option value="line">&nbsp;Line</option>
                <option value="pie">&nbsp;Pie</option>
            </select> */}
           <div className="dropzone-container">
            <Dropzone 
                onDrop={acceptedFiles => uploadFiles(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop chart csv file here.<br /> Or click to select file</p>
                        </div>
                        </section>
                    )}
                </Dropzone>
           </div>
           <div 
                onClick={handleEmbedButton}
                className="file-upload--embed-button"
                ref={embedButtonRef}
            >
                Embed
            </div>
            <p 
                className='file-upload--embed-code'
                ref={embedCodeRef}
            ></p>
           
        </div>
        
    )
}

export default FileUpload;


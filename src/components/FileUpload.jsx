import './FileUpload.scss';
import React, { useState, useRef } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { lastIndexOf, cloneDeep } from 'lodash';

const FileUpload = ({chart, setChart, setCsv, setConfig, chartOption, csv, setTemplateSelection, setChartOption, config}) => {
    const [fileName, setFileName] = useState('');
    const embedCodeRef = useRef();
    const embedButtonRef = useRef();
    const metaAreaRef = useRef();
    const metaInputRef = useRef();

    const stringify = (obj, token) => JSON.stringify(obj, (key, value) => typeof value === 'function' ? `${token}${value.toString().replaceAll("\n", ' ')}` : value);

    const handleMetaData = e => {
        const configClone = cloneDeep(config);
        configClone.meta = e.target.value;
        setConfig(configClone);
    }
    const handleEmbedButton = () => {
        console.log('embed chartOption', chartOption);

        const id = uuidv4();


        const data = {};
        data.option = stringify(chartOption, 'funcxyz_');
        data.title = chartOption.title && chartOption.title.text ? chartOption.title.text : '';
        data.subtitle = chartOption.title && chartOption.title.subtext ? chartOption.title.subtext : '';
        data.meta = JSON.stringify({meta: chartOption.info.meta, source: chartOption.info.source})

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

            switch (chartType) {
                case 'bar':
                case 'pie':
                case 'line':
                    setChart(chartType);
                    break;
                default:
                    return alert(`Uknown chart type in csv file: ${chartType}`);
            }
            const fileName = files[0].name;
            const loc = lastIndexOf('.');
          
            const fileNameParts = fileName.substring(0, fileName.lastIndexOf('.') !== -1 ? fileName.lastIndexOf('.') : fileName.length).split('--');
            let title = fileNameParts[0].trim();
            const subtitle = fileNameParts.length > 1 ? fileNameParts[1].trim() : '';
            setCsv(response.data);
            setFileName(fileName);
            setTemplateSelection('Default');
            setConfig({
                color: 'Default',
                checked: true,
                title: {
                    text: title,
                    subtext: subtitle
                }
            })
            metaAreaRef.current.style.visibility = 'visible';
        })
        .catch(error => {
            console.error(error.message, error.code);
            switch (error.code) {
                case 'ERR_NETWORK':
                    alert ("Error: Instant Charts server is down.\nPlease contact admin@pymnts.com.");
                    break;
                default:
                    alert('Error: Could not process CSV. Please reformat file.');
            }
            setCsv([]);
        })
    }

    return (
        <div className="file-upload">
            <h2 className="file-upload--input">Input</h2>
            <div className='file-upload--fileName'>{fileName}</div>
            {!chart && <select id="chartType" name = "chartType" className='file-upload--select' onChange={e => setChart(e.target.value)}>
                <option value=''>---</option>
                <option value="bar">&nbsp;Bar</option>
                <option value="line">&nbsp;Line</option>
                <option value="pie">&nbsp;Pie</option>
                <option value="stack">&nbsp;Stack</option>
            </select>}
           {chart && <div className="dropzone-container">
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
           </div>}
           <div ref={metaAreaRef} className="file-upload__chartMetaContainer">
                <h3 className='file-upload__metaDataLabel'>Meta Data</h3>
                <textarea 
                    onChange={handleMetaData}
                    value={config.meta ? config.meta : ''}
                    rows="3" 
                    className="file-upload__metaDataInput" 
                    type="textarea" 
                    name="chartMeta" 
                    id="chartMeta" 
                />
              
           </div>
           <div 
                onClick={handleEmbedButton}
                className={csv.length ? "file-upload--embed-button" : "file-upload--embed-button__hidden"}
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


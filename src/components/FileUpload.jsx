import './FileUpload.scss';
import React, { useState, useRef } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { lastIndexOf, cloneDeep } from 'lodash';

const FileUpload = ({chart, setChart, setCsv, setConfig, chartOption, csv, setTemplateSelection, setChartOption, config, embedCode, setEmbedCode, setPercentFlag}) => {
    const [fileName, setFileName] = useState('');
    
    const metaAreaRef = useRef();
    const metaInputRef = useRef();

    const stringify = (obj, token) => JSON.stringify(obj, (key, value) => typeof value === 'function' ? `${token}${value.toString().replaceAll("\n", ' ')}` : value);
    const capitalized = word => word.charAt(0).toUpperCase() + word.slice(1);

    function transpose(matrix) {
        const rows = matrix.length, cols = matrix[0].length;
        const grid = [];
        for (let j = 0; j < cols; j++) {
          grid[j] = Array(rows);
        }
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            grid[j][i] = matrix[i][j];
          }
        }
        return grid;
      }

    const processLineCsv = (CSV) => {
        console.log('processLineCsv', CSV);
        if (CSV[0][0].toLowerCase() === 'columns') {
            console.log("GOT COLUMNS");
            return transpose(CSV);
        }

        if (CSV[1][0] === CSV[2][0]) {
            if (CSV[0][0] !== CSV[1][0]) CSV.splice(0, 1);

            let sameCount = 1;
            for (let i = 1; i < CSV.length; ++i) {
                if (CSV[i][0] == CSV[i-1][0]) ++sameCount;
                else break;
            }

            for (let i = 0; i < CSV.length; i += sameCount) {
                
            }

            console.log('sameCount', sameCount);
        } else console.log(CSV[1][0], 'VS', CSV[2][0])


        return CSV;
    }

    const processPieCsv = (CSV) => {
     
        return CSV;

    }

    const processCsv = (CSV) => {
        
        switch (chart) {
            case 'pie':
                CSV = processPieCsv(CSV);
                break;
            case 'line':
                CSV = processLineCsv(CSV);
                break;
        }

        return CSV;
    }

    const handleMetaData = e => {
        const configClone = cloneDeep(config);
        configClone.meta = e.target.value;
        setConfig(configClone);
    }

    const handleEmbedButton = () => {
        console.log('embed chartOption', chartOption);   
        console.log('embed config', config);
        const option = cloneDeep(chartOption);
        option.info.config = config;

        const id = uuidv4();
        const data = {};

        data.option = stringify(option, 'funcxyz_');
        
        console.log('stringified', data.option);

        const request = {
            url: `https://charts.pymnts.com:6300/id/${id}`,
            method: "post",
            data
        }

        axios(request)
        .then(response => {
            setEmbedCode(`<div class='pymntsChartContainer'><div class='pymntsChart' id='${id}'></div></div>`);
        })
        .catch(error => {
            console.error(error);
            alert ('Error: Could not process request. Please try again.');
        })
        
    }
    
    const uploadFiles = files => {
        console.log('files', files);
        
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
            // const chartType = csvData[0][0] ? csvData[0][0].toLowerCase() : 'undefined';

            // console.log('chartType', chartType);

            // switch (chartType) {
            //     case 'bar':
            //     case 'pie':
            //     case 'line':
            //         setChart(chartType);
            //         break;
            //     default:
            //         return alert(`Uknown chart type in csv file: ${chartType}`);
            // }
            const fileName = files[0].name;
            const loc = lastIndexOf('.');
          
            const fileNameParts = fileName.substring(0, fileName.lastIndexOf('.') !== -1 ? fileName.lastIndexOf('.') : fileName.length).split('--');
            let title = fileNameParts[0].trim();
            const subtitle = fileNameParts.length > 1 ? fileNameParts[1].trim() : '';

            const standardizedCsv = processCsv(response.data);
            console.log('FileUpload standardizedCsv', standardizedCsv);
            //return;
            setCsv(standardizedCsv);
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
            {!chart && <h2 className="file-upload--input">Select Chart Type</h2>}
            {chart && !csv.length && <h2 className="file-upload--input">{capitalized(chart)} Chart</h2> }
            {/* <div className='file-upload--fileName'>{fileName}</div> */}
            {!chart && <select id="chartType" name = "chartType" className='file-upload--select' onChange={e => setChart(e.target.value)}>
                <option value=''>---</option>
                <option value="bar">&nbsp;Bar</option>
                <option value="line">&nbsp;Line</option>
                <option value="pie">&nbsp;Pie</option>
                <option value="stack">&nbsp;Stack</option>
            </select>}
           {chart && !csv.length && <div className="dropzone-container">
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
           {!embedCode && <div ref={metaAreaRef} className="file-upload__chartMetaContainer">
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
              
           </div>}
            {!embedCode && csv.length !== 0 && <div 
                    onClick={handleEmbedButton}
                    className={"file-upload--embed-button"}       
                >
                    Embed
                </div>
            }
            { embedCode && <div>
                <p 
                    className='file-upload--embed-code'
                >
                    {embedCode}
                </p>
                <div
                    className='file-upload__reload-button'
                    onClick={() => window.location.reload()}
                >
                    Reload
                </div>
                </div>
            }
           
        </div>
        
    )
}

export default FileUpload;


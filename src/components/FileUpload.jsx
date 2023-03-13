import './FileUpload.scss';
import React from 'react';
import Dropzone from 'react-dropzone';

const FileUpload = () => {
    
    const uploadFiles = files => {
        const fd = new FormData();
        console.log(files);
        files.forEach(file =>fd.append('File[]',file));
        console.log(fd.entries());
    }

    return (
        <div className="file-upload">
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
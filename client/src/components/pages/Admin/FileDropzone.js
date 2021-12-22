import {useField} from 'formik';
import {useCallback, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {Required} from '../../../util/formik';
import {FaTrashAlt} from 'react-icons/fa';


export function FileDropzone({name}) {
    const [files, setFiles] = useState([]);
    const [_, meta, helpers] = useField(name);
    const onDrop = useCallback((accFiles, rejFiles) => {
        const normalizedAcc = accFiles.map(file => ({file, errors: []}));
        const files = [...normalizedAcc, ...rejFiles].map(file => Object.assign(file, {preview: URL.createObjectURL(file.file)}));
        setFiles(() => files);
        helpers.setValue(files);
        helpers.setTouched(true, true);
    }, []);

    const determineClasses = useCallback((meta, isDragActive) => {
        const classes = ['dropzone'];
        if (isDragActive) {classes.push('active');};
        if (meta.touched && meta.error) {classes.push('error');};
        return classes.join(' ');
    }, []);

    useEffect(() => {
        helpers.setValue(files);
    }, [files]);

    const {isDragActive, getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: 'image/*',
        maxFiles: 1,
        maxSize: 500 * 1024,
        multiple: false,
    });

    const removeFile = (file) => {
        setFiles(files => {
            let updated = [...files.filter(curr => curr !== file)];
            updated = updated.map(a => ({...a}));
            if (updated.length === 1) {
                updated[0].errors = updated[0].errors.filter(({code}) => code !== 'too-many-files');
            }
            return updated;
        });
    };

    return (
        <div className="files">

            <div className="dropzone-container">
                <label htmlFor="dropzone">image<Required /></label>
                <div {...getRootProps({className: determineClasses(meta, isDragActive)})}>
                    <input id="dropzone" {...getInputProps()} />
                    <p>Drag&amp;drop files here, or click to select</p>
                </div>
                {
                    meta.touched && meta.error && typeof meta.error === 'string'
                        ? <div className="errors">{meta.error}</div>
                        : null
                }
            </div>

            <ul className='file-list'>
                {files.map((fw) => (
                    <li className={fw.errors.length === 0 ? 'selected-file' : 'selected-file error'} key={fw.file.path}>
                <header className="item-header">
                    <div className="file-data">
                        <span className="filename">{fw.file.path}</span>
                    </div>
                    <div className="errors">
                        {fw.errors.map(err => <p key={err.message}>{err.message}</p>)}
                    </div>
                    <button type='button' className='remove remove-input' onClick={() => removeFile(fw)}><FaTrashAlt /></button>
                </header>
                <img src={fw.preview} alt='' />
            </li>
                ))}
        </ul>
        </div >
    );
};
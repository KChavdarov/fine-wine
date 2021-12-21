import {useField} from 'formik';
import {useCallback, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {Required} from '../../../../util/formik';
import {FaTrash} from 'react-icons/fa';


export function FileDropzone({name}) {
    const [files, setFiles] = useState([]);
    const [_, meta, helpers] = useField(name);
    const onDrop = useCallback((accFiles, rejFiles) => {
        const normalizedAcc = accFiles.map(file => ({file, errors: []}));
        setFiles(() => [...normalizedAcc, ...rejFiles]);
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
        <>
            <label htmlFor="dropzone">image<Required /></label>
            <div {...getRootProps({className: determineClasses(meta, isDragActive)})}>
                <input id="dropzone" {...getInputProps()} />
                <p>Drag&amp;drop files here, or click to select</p>
            </div>

            <ul>
                {files.map((fw) => (
                    <li className="selected-file" key={fw.file.path}>
                        <div className="file-data">
                            <span className="filename">{fw.file.path}</span>
                            <button type='button' onClick={() => removeFile(fw)}><FaTrash /></button>
                        </div>
                        <div className="errors">
                            {fw.errors.map(err => <p key={err.message}>{err.message}</p>)}
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};
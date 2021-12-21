import './Create.scss';
import {ErrorMessage, Field, FieldArray, Form, Formik} from 'formik';
import {Fragment, useCallback} from 'react';
import * as yup from 'yup';
import {FaTrashAlt} from 'react-icons/fa';

import {Required} from '../../../../util/formik';
import {FileDropzone} from './FileDropzone';

const initialValues = {
    brand: '',
    name: '',
    description: '',
    type: '',
    grape: [''],
    country: '',
    region: '',
    year: 2021,
    volume: 0.75,
    basePrice: 0,
    discountPercentage: 0,
    files: [],
};

const validationSchema =
    yup.object({
        // brand: yup.string().required('Please enter wine brand'),
        // name: yup.string().required('Please enter wine name'),
        // description: yup.string().required('Please enter wine description'),
        // type: yup.string().required('Please enter wine type'),
        // grape: yup.array(yup.string().required('Please enter grape')).min(1, 'Please enter at least 1 grape'),
        // country: yup.string().required('Please enter wine country'),
        // region: yup.string().required('Please enter wine region'),
        // year: yup.number().required('Please enter wine year').min(1900, 'Wine year must be after 1900'),
        // volume: yup.number().required('Please enter wine volume').moreThan(0, 'Wine volume must be positive'),
        // basePrice: yup.number().required('Please enter wine price').moreThan(0, 'Wine price must be greater than 0'),
        // discountPercentage: yup.number().min(0, 'Discount percentage must be between 0-100').max(100,'Discount percentage must be between 0-100'),
        files: yup.array(yup.object({errors: yup.array().max(0, 'Incorrect file')})).min(1, 'Please upload wine image'),
    });



export function Create() {
    const onSubmit = useCallback((values) => {
        console.log(values);

        const formData = new FormData();

        Object.entries(values).forEach(([k, v]) => {
            if (typeof v === 'string' || typeof v === 'number') {
                formData.append(k, v);
            } else if (Array.isArray(v)) {
                if (k !== 'files') {
                    v.forEach(i => {
                        formData.append(k, i);
                    });
                } else {
                    v.forEach(({file}) => {
                        formData.append(k, file);
                    });
                }
            }
        });
        console.log([...formData.entries()]);

    }, []);

    const isError = useCallback(({touched, error}) => {
        return (touched && error) ? 'error' : '';
    }, []);


    return (
        <section className="create page container">
            <h1 className="page-title">Create Wine Listing</h1>

            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {(formik) => (
                    <Form className='create-form'>
                        <label htmlFor="brand">brand<Required /></label>
                        <Field name="brand">{({meta, field}) => <input type="text" id="brand" className={isError(meta)} {...field} />}</Field>
                        <ErrorMessage component="div" className="errors" name="brand" />

                        <label htmlFor="name">name<Required /></label>
                        <Field name="name">{({meta, field}) => <input type="text" id="name" className={isError(meta)} {...field} />}</Field>
                        <ErrorMessage component="div" className="errors" name="name" />

                        <FieldArray name='grape' {...formik.getFieldProps('grape')} >
                            {({remove, push, form}) => (
                                <>
                                    <label>grape<Required /></label>
                                    {formik.values.grape.map((v, i) => (
                                        <Fragment key={i}>
                                            <Field name={`grape[${i}]`}>{({meta, field}) => (
                                                <div className="form-group">
                                                    <input type="text" id={`grape[${i}]`} className={isError(meta)} {...field} />
                                                    {formik.values.grape.length > 1 ? <button className='remove-input' onClick={() => remove(i)}><FaTrashAlt /></button> : null}
                                                </div>
                                            )}
                                            </Field>
                                            <ErrorMessage component="div" className="errors" name={`grape[${i}]`} />
                                        </Fragment>
                                    ))}

                                    <button type='button' onClick={() => push('')} className='button secondary'>Add more grapes</button>
                                </>
                            )}
                        </FieldArray>

                        <label htmlFor="description">description<Required /></label>
                        <Field name="description">{({meta, field}) => <textarea rows="8" type="text" id="description" className={isError(meta)} {...field}></textarea>}</Field>
                        <ErrorMessage component="div" className="errors" name="description" />

                        <label htmlFor="type">type<Required /></label>
                        <Field name="type">{({meta, field}) => <input type="text" id="type" className={isError(meta)} {...field} />}</Field>
                        <ErrorMessage component="div" className="errors" name="type" />

                        <label htmlFor="country">country<Required /></label>
                        <Field name="country">{({meta, field}) => <input type="text" id="country" className={isError(meta)} {...field} />}</Field>
                        <ErrorMessage component="div" className="errors" name="country" />

                        <label htmlFor="region">region<Required /></label>
                        <Field name="region">{({meta, field}) => <input type="text" id="region" className={isError(meta)} {...field} />}</Field>
                        <ErrorMessage component="div" className="errors" name="region" />

                        <label htmlFor="year">year<Required /></label>
                        <Field name="year">{({meta, field}) => <input type="number" id="year" className={isError(meta)} {...field} />}</Field>
                        <ErrorMessage component="div" className="errors" name="year" />

                        <label htmlFor="volume">volume<Required /></label>
                        <Field name="volume">{({meta, field}) => <input type="number" id="volume" className={isError(meta)} {...field} />}</Field>
                        <ErrorMessage component="div" className="errors" name="volume" />

                        <label htmlFor="basePrice">base price<Required /></label>
                        <Field name="basePrice">{({meta, field}) => <input type="number" id="basePrice" className={isError(meta)} {...field} />}</Field>
                        <ErrorMessage component="div" className="errors" name="basePrice" />

                        <label htmlFor="discountPercentage">discount percentage<Required /></label>
                        <Field name="discountPercentage">{({meta, field}) => <input type="number" id="discountPercentage" className={isError(meta)} {...field} />}</Field>
                        <ErrorMessage component="div" className="errors" name="discountPercentage" />

                        <FileDropzone name="files" />
                        {
                            formik.touched.files && formik.errors.files && typeof formik.errors.files === 'string'
                                ? <div className="errors">{formik.errors.files}</div>
                                : null
                        }

                        <input type="submit" className="button submit-button" value="Create Listing" disabled={(!formik.isValid || formik.isSubmitting || !formik.dirty)} />
                    </Form>
                )}
            </Formik>

        </section>
    );
}
import './Create.scss';
import {ErrorMessage, Field, FieldArray, Form, Formik} from 'formik';
import {Fragment, useCallback} from 'react';
import * as yup from 'yup';
import {FaTrashAlt} from 'react-icons/fa';
import {Required} from '../../../../util/formik';
import {FileDropzone} from '../FileDropzone';
import {create} from '../../../../services/wineService';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

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
        brand: yup.string().required('Please enter wine brand'),
        name: yup.string().required('Please enter wine name'),
        description: yup.string().required('Please enter wine description'),
        type: yup.mixed().required('Please enter wine type').oneOf(['red', 'white', 'rose', 'sparkling', 'dessert'], 'Type must be one of red, white, rose, sparkling or dessert'),
        grape: yup.array(yup.string().required('Please enter grape')).min(1, 'Please enter at least 1 grape'),
        country: yup.string().required('Please enter wine country'),
        region: yup.string().required('Please enter wine region'),
        year: yup.number().required('Please enter wine year').min(1900, 'Wine year must be after 1900'),
        volume: yup.number().required('Please enter wine volume').moreThan(0, 'Wine volume must be positive'),
        basePrice: yup.number().required('Please enter wine price').moreThan(0, 'Wine price must be greater than 0'),
        discountPercentage: yup.number().min(0, 'Discount percentage must be between 0-100').max(100, 'Discount percentage must be between 0-100'),
        files: yup.array(yup.object({errors: yup.array().max(0, 'Incorrect file')})).min(1, 'Please upload wine image'),
    });

export function Create() {
    const navigate = useNavigate();

    const onSubmit = useCallback(async (values) => {
        try {
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
            const wine = await create(formData);
            navigate(`/details/${wine._id}`);
        } catch (error) {
            error.forEach(err => toast.error(err));
        }
    }, [navigate]);

    const isError = useCallback(({touched, error}) => {
        return (touched && error) ? 'error' : '';
    }, []);

    return (
        <section className="create page container">
            <h1 className="page-title">Create Form</h1>
            <header className="section-header"><h4>New Wine Listing</h4></header>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {(formik) => (
                    <Form className='create-form'>
                        <FileDropzone name="files" />

                        <div className="fields">
                            <label htmlFor="brand">brand<Required /></label>
                            <Field name="brand">{({meta, field}) => <input type="text" id="brand" className={isError(meta)} {...field} />}</Field>
                            <ErrorMessage component="div" className="errors" name="brand" />

                            <label htmlFor="name">name<Required /></label>
                            <Field name="name">{({meta, field}) => <input type="text" id="name" className={isError(meta)} {...field} />}</Field>
                            <ErrorMessage component="div" className="errors" name="name" />

                            <label htmlFor="type">type<Required /></label>
                            <Field name="type">{({meta, field}) => <input type="text" id="type" className={isError(meta)} {...field} />}</Field>
                            <ErrorMessage component="div" className="errors" name="type" />

                            <FieldArray name='grape' {...formik.getFieldProps('grape')} >
                                {({remove, push, form}) => (
                                    <>
                                        <label>grape<Required /></label>
                                        {formik.values.grape.map((v, i) => (
                                            <Fragment key={i}>
                                                <Field name={`grape[${i}]`}>{({meta, field}) => (
                                                    <div className="form-group">
                                                        <div className="group-main">
                                                            <input type="text" id={`grape[${i}]`} className={isError(meta)} {...field} />
                                                            {formik.values.grape.length > 1 ? <button className='remove-input' onClick={() => remove(i)}><FaTrashAlt /></button> : null}
                                                        </div>
                                                        <ErrorMessage component="div" className="errors" name={`grape[${i}]`} />
                                                    </div>
                                                )}
                                                </Field>
                                            </Fragment>
                                        ))}

                                        <button type='button' onClick={() => push('')} className='button secondary'>Add more grapes</button>
                                    </>
                                )}
                            </FieldArray>

                            <label htmlFor="description">description<Required /></label>
                            <Field name="description">{({meta, field}) => <textarea rows="8" type="text" id="description" className={isError(meta)} {...field}></textarea>}</Field>
                            <ErrorMessage component="div" className="errors" name="description" />

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

                            <input type="submit" className="button submit-button" value="Create Listing" disabled={(!formik.isValid || formik.isSubmitting || !formik.dirty)} />

                        </div>
                    </Form>

                )}
            </Formik>

        </section>
    );
}
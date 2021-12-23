export function isTouchedError(formik, name){
    return formik.errors[name] && formik.touched[name];
}

export const Required = () => <span className='required-label'>*required</span>;

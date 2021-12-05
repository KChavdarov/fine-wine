import {useState} from 'react';
import {useNavigate} from 'react-router';
import {useUserContext} from '../../../../contexts/User';
import {toast} from 'react-toastify';
import './Login.scss';

const initialState = {
    email: '',
    password: '',
};

export function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState(initialState);
    const navigate = useNavigate();
    const {login} = useUserContext();

    function inputChangeHandler(event) {
        const name = event.target.name;
        const value = event.target.value;
        setState(state => ({...state, [name]: value}));
    }

    async function formSubmitHandler(event) {
        setIsLoading(() => true);
        event.preventDefault();
        try {
            await login(state);
            setState(initialState);
            setIsLoading(() => false);
            navigate('/catalogue');
        } catch (error) {
            setIsLoading(() => false);
            error.message.forEach(err => toast.error(err));
        }
    }


    return (
        <form className='login-form' onSubmit={formSubmitHandler}>

            <label htmlFor="email">E-mail</label>
            <input type="text" name="email" placeholder="example@email.com" id="email" onChange={inputChangeHandler} value={state.email} />
            <div className="errors"></div>

            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="******" id="password" onChange={inputChangeHandler} value={state.password} />
            <div className="errors"></div>

            <input type="submit" className="button submit-button" value="Login" disabled={(isLoading || state.isInvalid)} />

        </form>
    );
}
import './Modal.scss';
import {disableBodyScroll, clearAllBodyScrollLocks} from 'body-scroll-lock';
import {createContext, createRef, useEffect, useState, useContext} from 'react';

export function Modal() {
    const targetRef = createRef();
    const {modalState, closeModal} = useContext(ModalContext);

    useEffect(() => {
        if (targetRef.current) {
            disableBodyScroll(targetRef.current);
        }
        return () => clearAllBodyScrollLocks();
    }, [targetRef]);

    const onChoice = (choice) => {
        closeModal();
        modalState.callback(choice);
    };

    return (
        modalState.active
            ? < div className="overlay" >
                <div ref={targetRef} className="dialog-box">
                    <p className='message'>{modalState.message}</p>
                    <div className="buttons">
                        <button onClick={() => onChoice(true)} className='button accept'>Confirm</button>
                        <button onClick={() => onChoice(false)} className='button reject'>Cancel</button>
                    </div>
                </div>
            </div >
            : null
    );
}

export const ModalContext = createContext();

const initialState = {
    active: false,
    message: '',
    callback: undefined,
};

export function ModalProvider({children}) {
    const [modalState, setModalState] = useState(initialState);


    function createModal(message, callback) {
        setModalState(state => ({
            active: true,
            message,
            callback
        }));
    };

    function closeModal() {
        setModalState(initialState);
    }

    return (
        <ModalContext.Provider value={{modalState, createModal, closeModal}}>{children}</ModalContext.Provider>
    );
}
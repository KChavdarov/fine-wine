import {Link} from 'react-router-dom';
import './Slide.scss';

export function Slide({data}) {
    return (
        <div className="slide-container" style={{'backgroundImage': `url('/images/${data.image}')`}}>
            <h1 className="slide-title">{data.title}</h1>
            <Link className="slide-button" to={data.link}>{data.text}</Link>
        </div >
    );
}
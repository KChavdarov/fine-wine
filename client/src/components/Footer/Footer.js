import {Link} from 'react-router-dom';
import './Footer.scss';
import {FaFacebookF, FaTwitter, FaInstagram, FaYoutube} from "react-icons/fa";

export function Footer() {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-group">
                    <h5><Link to="/" />Fine wine</h5>
                    <ul className="about-us">
                        <li><Link to="/about">About us</Link></li>
                        <li><Link to="/contacts" >Contacts</Link></li>
                        <li><Link to="/terms" >Terms and conditions</Link></li>
                    </ul>
                </div>
                <div className="footer-group">
                    <h5>Customer service</h5>
                    <ul className="customer-service">
                        <li><a href="tel:+359010010101">Phone: +359 010 010 101</a></li>
                        <li> MON - FRI | 09:00 - 18:00</li>
                    </ul>
                </div>
                <div className="footer-group">
                    <h5>Social Media</h5>
                    <ul className="social-media">
                        <li><a href="http://www.youtube.com"><FaYoutube /></a></li>
                        <li><a href="http://www.instagram.com"><FaInstagram /></a></li>
                        <li><a href="http://www.twitter.com"><FaTwitter /></a></li>
                        <li><a href="http://www.facebook.com"><FaFacebookF /></a></li>
                    </ul>
                </div>
                <p className="copyright">&copy;Demo app made for educational purposes. No rights reserved.</p>
            </div>
        </footer>
    );
}
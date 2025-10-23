import { Link } from 'react-router-dom';
import '../styling/Button.css';

function Button({ text, to, className, onClick }) {
    if (to) {
        return (
            <Link to={to} className={className}>
                {text}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={className}>
            {text}
        </button>
    );
}

export default Button;
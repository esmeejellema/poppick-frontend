import {useEffect, useState} from 'react';
import '../../styling/Titles.css';
import '../../styling/Wrapper.css';
import '../../styling/Animations.css';


function Question2({ previousAnswer, onSelect }) {
    const [isSelected, setSelectedAnswer] = useState(previousAnswer || '');
    const [animate, setAnimate] = useState(false);


    const handleSelect = (choice) => {
        setSelectedAnswer(choice);
        onSelect(choice);
        return choice;
    };
    useEffect(() => {
        // Trigger fade-in after mount
        const timeout = setTimeout(() => setAnimate(true), 10);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className={`questions fade-in ${animate ? 'visible' : ''}`}>
            <h2 className="question">Is this a short trip or epic quest?</h2>
            <div className="wrapper-answers">
                <button onClick={() => handleSelect('short')} className={`button-tertiary ${isSelected === 'short' ? 'selected' : ''}`}>
                    Short Trip<br />
                    <span className="subtitle">Less than 1.5 hours</span>
                </button>

                <button onClick={() => handleSelect('long')} className={`button-tertiary ${isSelected === 'long' ? 'selected' : ''}`}>
                    Epic Quest<br />
                    <span className="subtitle">More than 1.5 hours</span>
                </button>
            </div>
        </div>
    );
}

export default Question2;

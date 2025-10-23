import {useEffect, useState} from 'react';
import '../../styling/Titles.css';
import '../../styling/Wrapper.css';
import '../../styling/Animations.css';



function Question4({ previousAnswer, onSelect}) {
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
            <h2 className="question">Which streaming service is available to you?</h2>
            <div className="wrapper-answers">
                <button onClick={() => handleSelect('Netflix')} className={`button-tertiary ${isSelected === 'Netflix' ? 'selected' : ''}`}>
                    Netflix</button>
                <button onClick={() => handleSelect('HBO Max')} className={`button-tertiary ${isSelected === 'HBO Max' ? 'selected' : ''}`}>
                    HBO Max</button>
                <button onClick={()=> handleSelect('Amazon Prime')} className={`button-tertiary ${isSelected === 'Amazon Prime' ? 'selected' : ''}`}>
                    Amazon Prime</button>
            </div>
        </div>
    );
}

export default Question4;

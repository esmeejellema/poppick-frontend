import { useState, useEffect } from 'react';
import '../../styling/Titles.css';
import '../../styling/Wrapper.css';
import '../../styling/Animations.css';



function Question3({ previousAnswer, onSelect }) {
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
            <h2 className="question">Feeling nostalgic or craving something fresh?</h2>
            <div className="wrapper-answers">
                <button onClick={() => handleSelect('classic')} className={`button-tertiary ${isSelected === 'classic' ? 'selected' : ''}`}>
                    A golden oldie<br />
                    <span className="subtitle">Before 2005</span>
                </button>

                <button onClick={() => handleSelect('recent')} className={`button-tertiary ${isSelected === 'recent' ? 'selected' : ''}`}>
                    A modern masterpiece<br />
                    <span className="subtitle">Since 2005</span>
                </button>
            </div>
        </div>
    );
}

export default Question3;

import { useState, useEffect } from 'react';
import '../../styling/Titles.css';
import '../../styling/Wrapper.css';
import '../../styling/Animations.css';


const Genres = [
    "Action", "Comedy", "Drama", "Romance", "Horror", "Sci-Fi", "Fantasy", "Thriller",
    "Documentary", "Mystery", "Animation", "Adventure", "Crime", "Family", "Musical",
    "Biography", "War"
];
function Question1({ previousAnswer, onSelect }) {
    const [isSelected, setSelectedGenre] = useState(previousAnswer || '');
    const [animate, setAnimate] = useState(false);


    const handleSelect = (genre) => {
        setSelectedGenre(genre);
        onSelect(genre);
    };

    useEffect(() => {
        // Trigger fade-in after mount
        const timeout = setTimeout(() => setAnimate(true), 10);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className={`questions fade-in ${animate ? 'visible' : ''}`}>
            <h2 className="question">What kind of genre are you in the mood for?</h2>
            <div className="wrapper-answers-container">
                {Genres.map((genre) => (
                    <button
                        key={genre}
                        onClick={() => handleSelect(genre)}
                        className={`button-tertiary ${isSelected === genre ? 'selected' : ''}`}
                    >
                        {genre}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Question1;

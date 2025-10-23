import React, {useState} from 'react';
import '../../styling/Grid.css'
import '../../styling/Button.css';
import '../../styling/Wrapper.css';
import '../../styling/Lists.css';
import '../../styling/Container.css';
import './ListEditor.jsx';

//1. state declarations
const ListMovies = ({movies, existingLists, onAddMovies}) => {//passing on variabels from parent as props into component.
    const [selectedMovieIds, setSelectedMovieIds] = useState([]);
    const [selectedListId, setSelectedListId] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedList, setSelectedList] = useState(null);
    const [isSliding, setIsSliding] = useState(false);

    // 4. helper functions
    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    };

    const handleSelect = (list) => {
        setSelectedList(list);//its to identify the item you pick from existing lists.
        setSelectedListId(list.id);//id that was set in table from lists.
        setIsOpen(false);
    };
    const toggleMovieSelection = (id) => {
        setSelectedMovieIds(prev =>
            prev.includes(id)
                ? prev.filter(movieId => movieId !== id)
                : [...prev, id]
        );
    };
    const addMoviesToList = () => {
        if (!selectedListId || selectedMovieIds.length === 0) {
            alert("Select a list and at least one movie");
            return;
        }
        onAddMovies(selectedListId, selectedMovieIds, () => {
            setSelectedMovieIds([]);
            setSelectedList(null);
            setSelectedListId(null);
        });
    };

    return (
        <div>
            {/*front side*/}
            <div className={`anim-slide-card-front ${isSliding ? 'anim-slide-out-left' : 'anim-slide-in-left'}`}>
                <button className="button-primary" onClick={() => setIsSliding(true)}>
                    Add Movies
                </button>
            </div>

            {/*back side*/}
            <div className={`anim-slide-card-back ${isSliding ? 'anim-slide-in-right' : 'anim-slide-out-right'}`}>
                <div className="wrapper-list-movies">
                    <div className="wrapper-list-selection">
                        <button className="button-secondary" onClick={toggleDropdown}>
                            {selectedList ? selectedList.listName : 'Select a list'}
                        </button>
                        {isOpen && (
                            <ul className="list-selection">
                                {existingLists.map((list) => (
                                    <li key={list.id}
                                        onClick={() => handleSelect(list)}>
                                        {list.listName}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="wrapper-scroll-container-buttons">
                        <div className="grid-scroll-container">
                            <div className="grid-movies">
                                {movies.map((movie) => (
                                    <div
                                        key={movie.id}
                                        className={`grid-movie-card ${selectedMovieIds.includes(movie.id) ? 'selected' : ''}`}
                                        onClick={() => toggleMovieSelection(movie.id)}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedMovieIds.includes(movie.id)}
                                            onChange={() => toggleMovieSelection(movie.id)}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <h4>{movie.title}</h4>
                                    </div>
                                ))}
                            </div>

                        </div>
                        <button className="button-secondary" onClick={addMoviesToList}>Add Selected Movies</button>
                        <button className="button-secondary" onClick={() => setIsSliding(false)}>Back</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ListMovies;


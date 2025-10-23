import React, {useState} from 'react';
import '../../styling/Lists.css';
import '../../styling/Grid.css';
import '../../styling/Container.css';
import '../../styling/Button.css';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

const ListEditor = ({existingLists, onDelete}) => {
    const [expandedListId, setExpandedListId] = useState(null);
    const [isSliding, setIsSliding] = useState(false);

    const toggleList = (listId) => {
        setExpandedListId(prevId => (prevId === listId ? null : listId));
    };

    return (
        <div>
            {/* Front side */}
            <div className={`anim-slide-card-front ${isSliding ? 'anim-slide-out-left' : 'anim-slide-in-left'}`}>
                <button className="button-primary" onClick={() => setIsSliding(true)}>
                    Edit Lists
                </button>
            </div>

            {/* Back side */}
            <div className={`anim-slide-card-back ${isSliding ? 'anim-slide-in-right' : 'anim-slide-out-right'}`}>
                <div>
                    <ul className="lists-edit">
                        {existingLists.map(list => (
                            <li key={list.id} className={`list-item ${expandedListId === list.id ? 'expanded' : ''}`}>
                                <button
                                    className="delete-button"
                                    onClick={() => onDelete(list.id)}
                                >
                                    <FontAwesomeIcon icon={faTrash}/>
                                </button>
                                <div
                                    className="list-header"
                                    onClick={() => toggleList(list.id)}
                                >{list.listName}
                                </div>

                                {expandedListId === list.id && (
                                    <div className="container-scroll">
                                        {list.movies.length === 0 ? (
                                            <p>No movies in this list.</p>
                                        ) : (
                                            <div>
                                                {list.movies.map(movie => (
                                                    <div key={movie.id}>
                                                        <h4>{movie.title}</h4>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>

                    <button
                        className="button-secondary"
                        onClick={() => setIsSliding(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ListEditor;

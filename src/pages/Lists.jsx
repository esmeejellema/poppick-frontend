import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import api from "../api/api.js";

// Components
import ListName from "../components/Lists/ListName.jsx";
import ListMovies from "../components/Lists/ListMovies.jsx";
import ListEditor from "../components/Lists/ListEditor.jsx";
import Button from '../components/Button.jsx';

// Styling
import '../styling/Menu.css';

function Lists() {
    // State
    const [movies, setMovies] = useState([]);
    const [existingLists, setExistingLists] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);

    // Hooks
    const navigate = useNavigate();

    // API connection
    async function fetchLists() {
        try {
            const response = await api.get('/movielists');
            setExistingLists(response.data);
        } catch (error) {
            console.error('Error fetching lists:', error.message);
        }
    }

    async function fetchMovies() {
        try {
            const response = await api.get('/movies');
            setMovies(response.data);
        } catch (error) {
            console.error('Error fetching movies:', error.message);
        }
    }

    useEffect(() => {
        fetchLists();
        fetchMovies();
    }, []);

    async function createList(listName) {
        try {
            const response = await api.post('/movielists', { listName });
            alert(`List "${response.data.listName}" created successfully!`);
            fetchLists();
        } catch (error) {
            alert('Error creating list!');
            console.error(error);
        }
    }

    async function addMovies(selectedListId, selectedMovieIds, clearSelectedMovies) {
        if (!selectedListId || selectedMovieIds.length === 0) {
            alert('Select a list and at least one movie');
            return;
        }

        try {
            const response = await api.put(`/movielists/${selectedListId}/movies`, {
                movieIds: selectedMovieIds
            });
            alert(`List "${response.data.listName}" updated with new movies!`);
            clearSelectedMovies([]);
            fetchLists(); // Refresh lists after update
        } catch (error) {
            alert('Could not add movies');
            console.error(error);
        }
    }

    async function deleteList(listId) {
        if (!window.confirm('Are you sure you want to delete this list?')) return;

        try {
            await api.delete(`/movielists/${listId}`);
            alert('List deleted!');
            fetchLists();
        } catch (error) {
            alert('Error deleting list!');
            console.error(error);
        }
    }
    // Handlers
    const handleLogout = () => {
        console.log("Logout clicked");
        localStorage.removeItem('token');  // JWT-token verwijderen
        alert("logged out successfully.");
        navigate('/');  // Terug naar home
    };
    useEffect(() => {
        const handler = (e) => {
            if (!e.target.closest('.menu-container')) setMenuOpen(false);
        };
        document.addEventListener('click', handler);
        return () => document.removeEventListener('click', handler);
    }, []);


    return (
        <div>
            <div className="menu-container">
                <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </button>

                {menuOpen && (
                    <div className="menu-dropdown">
                        <Button className="button-primary" text="Profile" to="/profile" />
                        <Button className="button-primary" text="Log out" onClick={handleLogout} />
                    </div>
                )}
            </div>

            {/*/!* Navigation buttons *!/*/}
            {/*<Button className="button-primary nav-pages-left" text="Profile" to="/profile" />*/}
            {/*<Button className="button-primary nav-pages-right" text="Log out" onClick={handleLogout} />*/}

            {/* Main container layout */}
            <div className="container-box-lay-out">
                {/* Create List box */}
                <div className="box box-create-list">
                    <ListName onCreateList={createList} />
                </div>

                {/* Add Movies box */}
                <div className="box box-add-movies">
                    <ListMovies
                        movies={movies}
                        existingLists={existingLists}
                        onAddMovies={addMovies}
                    />
                </div>

                {/* Edit List box */}
                <div className="box box-edit-list">
                    <ListEditor
                        existingLists={existingLists}
                        onFetchList={fetchLists}
                        onDelete={deleteList}
                    />
                </div>
            </div>
        </div>
    );
}

export default Lists;

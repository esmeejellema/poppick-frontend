import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import api from "../api/api.js";

// Components
import Button from "../components/Button.jsx";
import Question1 from '../components/Quiz/Question1';
import Question2 from '../components/Quiz/Question2';
import Question3 from '../components/Quiz/Question3';
import Question4 from '../components/Quiz/Question4';

// Styling
import '../styling/Animations.css';
import '../styling/Titles.css';
import '../styling/Container.css';
import '../styling/Wrapper.css';
import '../styling/progressbar.css';
import '../styling/Menu.css';

function Quiz() {
    // State
    const [step, setStep] = useState(1);
    const [recommendation, setRecommendation] = useState();
    const [movies, setMovies] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [userRecommendations, setUserRecommendations] = useState([]);
    const [showSaved, setShowSaved] = useState(false);
    const [answers, setAnswers] = useState({
        genre: '',
        length: '',
        releaseYear: '',
        streamingService: ''
    });
    const totalQuestions = 4;

    // Hooks
    const navigate = useNavigate();
    const { userId, setUser } = useUser();

    // Handlers
    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
    };

    const goToNextStep = () => {
        if (step < 5) setStep(prev => prev + 1);
    };

    const goToPreviousStep = () => {
        if (step > 1) setStep(prev => prev - 1);
    };

    const handleAnswerChange = (questionId, answerPayLoad) => {
        setAnswers(prev => ({ ...prev, [questionId]: answerPayLoad }));
    };

    // API connection
    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await api.get('/movies');
                console.log('Fetched movies:', response.data);
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error.message);
            }
        }

        fetchMovies();
    }, []);

    async function saveRecommendation(userId, recommendation) {
        console.log("DEBUG SAVE:", userId, recommendation);
        if (!userId || !recommendation?.id) {
            console.warn("Missing userId or recommendation.id");
            return;
        }

        try {
            const response = await api.post(`/recommendations`, null, {
                params: { userId, movieId: recommendation.id },
            });
            console.log("Recommendation saved:", response.data);
        } catch (error) {
            console.error("Error saving recommendation:", error.response?.data || error.message);
        }
    }

    async function getUserRecommendations(userId) {
        if (!userId) return;

        // Toggle visibility
        if (showSaved) {
            setShowSaved(false);
            return;
        }

        try {
            const response = await api.get(`/recommendations/${userId}`);
            setUserRecommendations(response.data);
            setShowSaved(true);
            console.log("Recommendations:", response.data);
        } catch (error) {
            console.error("Error fetching recommendations:", error.response?.data || error.message);
        }
    }

    // Handler for business logic
    const handleAnswerSubmit = () => {
        let filtered = movies.filter(movie => movie.genre === answers.genre);

        if (answers.length === 'short') {
            filtered = filtered.filter(movie => movie.length <= 90);
        } else if (answers.length === 'long') {
            filtered = filtered.filter(movie => movie.length > 90);
        }

        if (answers.releaseYear === 'recent') {
            filtered = filtered.filter(movie => movie.releaseYear >= 2015);
        } else if (answers.releaseYear === 'classic') {
            filtered = filtered.filter(movie => movie.releaseYear < 2015);
        }

        if (['Netflix', 'HBO Max', 'Amazon Prime'].includes(answers.streamingService)) {
            filtered = filtered.filter(movie => movie.streamingService === answers.streamingService);
        }
        if (filtered.length === 0) {
            setRecommendation(null);
        } else {
            const selectedMovie = filtered.length > 0
                ? filtered[Math.floor(Math.random() * filtered.length)]
                : null;

            console.log("Answers:", answers);
            console.log("Filtered movies:", filtered);
            console.log("Selected movie:", selectedMovie);

            setRecommendation(selectedMovie);
            setStep(5);
        }
    };

    // UI helper
    const renderProgressBar = () => {
        const percent = (step / totalQuestions) * 100;
        return (
            <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${percent}%` }}></div>
            </div>
        );
    };

    useEffect(() => {
        const handler = (e) => {
            if (!e.target.closest('.menu-container')) setMenuOpen(false);
        };
        document.addEventListener('click', handler);
        return () => document.removeEventListener('click', handler);
    }, []);


    return (
        <div className="container-quiz-page">
            {/* Menu */}
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

            {/* Questions */}
            {step === 1 && (
                <Question1
                    onSelect={(answer) => handleAnswerChange('genre', answer)}
                    previousAnswer={answers.genre}
                />
            )}
            {step === 2 && (
                <Question2
                    onSelect={(answer) => handleAnswerChange('length', answer)}
                    previousAnswer={answers.length}
                />
            )}
            {step === 3 && (
                <Question3
                    onSelect={(answer) => handleAnswerChange('releaseYear', answer)}
                    previousAnswer={answers.releaseYear}
                />
            )}
            {step === 4 && (
                <Question4
                    onSelect={(answer) => handleAnswerChange('streamingService', answer)}
                    previousAnswer={answers.streamingService}
                />
            )}

            {/* Recommendation */}
            {step === 5 && recommendation && (
                <div className="recommendation">
                    <h2>We recommend</h2>
                    <p className="title-recommendation">{recommendation.title}</p>
                    <button
                        className="button-primary"
                        onClick={() => saveRecommendation(userId, recommendation)}
                    >
                        Save recommendation
                    </button>
                    <button
                        className="button-primary"
                        onClick={() => getUserRecommendations(userId)}
                    >
                        {showSaved ? "Hide saved recommendations" : "Show saved recommendations"}
                    </button>

                    {showSaved && (
                        <div className="saved-recommendations">
                            {userRecommendations.length === 0 ? (
                                <p>No recommendations saved yet.</p>
                            ) : (
                                <ul>
                                    {userRecommendations.map((r) => (
                                        <li key={r.id}>{r.movieTitle}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                    <button
                        className="button-secondary"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </button>
                </div>
            )}

            {/* Navigation */}
            <div className="wrapper-button-secondary">
                {step > 1 && step < 5 && (
                    <button className="button-secondary" onClick={goToPreviousStep}>
                        Previous
                    </button>
                )}

                {step < 5 && renderProgressBar()}

                {step < 4 && (
                    <button className="button-secondary" onClick={goToNextStep}>
                        Next
                    </button>
                )}
                {step === 4 && (
                    <button className="button-secondary" onClick={handleAnswerSubmit}>
                        Submit
                    </button>

                )}
            </div>
        </div>
    );
}

export default Quiz;

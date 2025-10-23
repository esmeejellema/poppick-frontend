import React from 'react';
import { Play } from "lucide-react";
import { Link } from "react-router-dom";

// Components
import Button from '../components/Button';

// Styling
import '../styling/Titles.css';
import '../styling/Wrapper.css';
import '../styling/Button.css';


function Home() {

    return(
        <div className="wrapper-home">
            <div className="button-primary-wrapper">
                <Link className="button-play" to="/login">
                    <Play size={40} />
                </Link>
            </div>
            <h1 className="header">PopPick</h1>
        </div>
    );
}

export default Home;

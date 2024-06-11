import React, { useEffect, useState, useRef } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Board from './miniComp/Board'
import GameMenu from './miniComp/GameMenu'
import { useLocation } from 'react-router-dom';
import FeedbackService from './FeedbackService';
import ScoreService from './ScoreService';
import backgroundMusic from './music/main.mp3';
import battleMusic from './music/battle.mp3';








function GameService() {

    const location = useLocation();

    const users = location.state?.users;

    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [gameStatus, setGameStatus] = useState(() => localStorage.getItem('gameStatus') || 'menu');
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [actualMusic, setActualMusic] = useState("std");
    const audioRef = useRef(new Audio());

    useEffect(() => {
        // Initially set and play background music
        audioRef.current.loop = true;
        const playAudio = async () => {
            try {
                await audioRef.current.play();
                setIsAudioPlaying(true);
            } catch (err) {
                console.error('Error playing audio:', err);
                setIsAudioPlaying(false);
            }
        };

        audioRef.current.src = backgroundMusic;
        playAudio();
    }, []);

    useEffect(() => {
        localStorage.setItem('token', token);
        localStorage.setItem('gameStatus', gameStatus);

    }, [token, gameStatus]);


    useEffect(() => {
        const newSrc = gameStatus === "playing" ? battleMusic : backgroundMusic;
        const newMusic = gameStatus === "playing" ? 'battle' : 'std';
        if (actualMusic !== newMusic) {
            audioRef.current.pause();
            audioRef.current.src = newSrc;
            setActualMusic(newMusic);
            audioRef.current.play().catch(err => console.error('Error playing audio:', err));
        }
    }, [gameStatus, actualMusic]);



    const handleGameStatusChange = (newToken, status) => {
        setToken(newToken);
        setGameStatus(status);
    };




    const buttonStyle = {
        backgroundColor: '#DFD0B8',
        color: 'white', // White text
        padding: '10px 20px', // Padding around the text
        fontSize: '16px', // Larger text size
        border: 'none', // No border
        borderRadius: '5px', // Rounded corners
        cursor: 'pointer', // Pointer cursor on hover
        outline: 'none', // No outline when focused
        boxShadow: '0 4px #948979', // Box shadow for 3D effect
        transition: 'all 0.3s', // Smooth transition for interactions
    }

    const startAudioManually = () => {
        if (!isAudioPlaying) {
            audioRef.current.play().then(() => {
                setIsAudioPlaying(true);
            }).catch(err => {
                console.error('Manual play error:', err);
            });
        }
    };


    return (
        <div>
            {!isAudioPlaying && (
                <button onClick={startAudioManually} >
                    🔊
                </button>
            )}
            {gameStatus === "menu" && <GameMenu onGameStatusChange={handleGameStatusChange} />}
            {/* {gameStatus === "options" && <GameMenu onGameStatusChange={handleGameStatusChange} />} */}
            {(gameStatus === "score" || gameStatus === "light_win" || gameStatus === "dark_win" || gameStatus === "tie") &&
                <div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '70px',
                    }}>
                        <button style={buttonStyle} onMouseOver={({ target }) => target.style.backgroundColor = '#B2A693'}
                            onMouseOut={({ target }) => target.style.backgroundColor = '#DFD0B8'}
                            onClick={() => setGameStatus("menu")}>
                            Return to Menu
                        </button>
                    </div>
                    <ScoreService status={gameStatus} users={users} />
                </div>
            }

            {gameStatus === "review" &&
                <div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '70px',
                    }}><button style={buttonStyle} onMouseOver={({ target }) => target.style.backgroundColor = '#B2A693'}
                        onMouseOut={({ target }) => target.style.backgroundColor = '#DFD0B8'}
                        onClick={() => setGameStatus("menu")}>
                            Return to Menu</button></div>
                    <FeedbackService />
                </div>
            }
            {gameStatus === "playing" && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',

                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center', // This will align the children elements (divs) to the right
                    }}><button style={buttonStyle} onMouseOver={({ target }) => target.style.backgroundColor = '#B2A693'}
                        onMouseOut={({ target }) => target.style.backgroundColor = '#DFD0B8'}
                        onClick={() => setGameStatus("menu")}>
                            Return to Menu</button></div>
                    <Board users={users} token={token} onGameStatusChange={handleGameStatusChange} battleMusic={battleMusic} backgroundMusic={backgroundMusic} />
                </div>
            )
            }

        </div >
    );
}

export default GameService;



import { useState, useEffect } from 'react';
import "./Board.css";

const Unit = ({ entity, className, onClick, movingUnit, cellSize, cellStyle }) => {

    const [backgroundSize, setBackgroundSize] = useState('auto');
    const [wayOfSee, setWayOfSee] = useState('auto');
    const [imgSrc, setSrc] = useState('auto');
    const [currentFrame, setCurrentFrame] = useState(0);
    const scale = 0.38;

    const name = entity.name;

    const tdWidth = 115;
    const tdHeight = 120;

    let spriteWidth = 0;
    let spriteHeight = 0;
    let frameCount = 0;
    let frameRate = 0;

    let x = 0;
    let y = 0;

    switch (entity.name) {
        case "Pikeman":
            spriteWidth = 70; spriteHeight = 100; x = 0; y = 6;
            frameCount = 8; frameRate = 200; // приклад значень для Pikeman
            break;
        case "Archer":
            spriteWidth = 70; spriteHeight = 90; x = 0; y = 0;
            //frameCount = 6; frameRate = 120; // приклад значень для Archer
            break;
        case "Angel":
            spriteWidth = 100; spriteHeight = 115; x = 0; y = 0;
            //frameCount = 8; frameRate = 150; // приклад значень для Angel
            break;
        case "Cavalier":
            spriteWidth = 115; spriteHeight = 120; x = 0; y = 0;
            //frameCount = 10; frameRate = 80; // приклад значень для Cavalier
            break;
        case "Griffin":
            spriteWidth = 95; spriteHeight = 120; x = 25; y = 3;
            //frameCount = 5; frameRate = 110; // приклад значень для Griffin
            break;
        case "Monk":
            spriteWidth = 70; spriteHeight = 90; x = 0; y = 0;
            //frameCount = 3; frameRate = 130; // приклад значень для Monk
            break;
        case "Swordsman":
            spriteWidth = 60; spriteHeight = 90; x = 0; y = 10;
            //frameCount = 4; frameRate = 100; // приклад значень для Swordsman
            break;
        default:
            break;
    }

    if (entity.state === 'BLOCKED') {
        spriteWidth = 95; spriteHeight = 95; x = 0; y = 0;
        frameCount = 1; frameRate = 100; // якщо заблоковано, не потрібно анімації
    }

    useEffect(() => {
        const img = new Image();

        if (entity.state === 'BLOCKED') {
            img.src = `./images/rock-long.png`;
        } else {
            img.src = `./images/units/${name}/all.png`;
        }
        setSrc(img.src);
        img.onload = () => {
            setBackgroundSize(`${img.naturalWidth * scale}px ${img.naturalHeight * scale}px`);
            if (entity.state === 'BLOCKED') {
                setWayOfSee(`scaleX(1)`);
            } else {
                setWayOfSee(entity.team === "DARK" ? `scaleX(-1)` : `scaleX(1)`);
            }
        };
    }, [entity, name]);

    useEffect(() => {
        if (frameCount > 1) {
            const interval = setInterval(() => {
                setCurrentFrame((prevFrame) => (prevFrame + 1) % frameCount);
            }, frameRate);
            return () => clearInterval(interval);
        }
    }, [frameRate, frameCount]);

    const isMoving = movingUnit && movingUnit.x === entity.x && movingUnit.y === entity.y;

    const style = isMoving ? {
        transform: `translate(${movingUnit.deltaX * (cellSize[1] + 4)}px, ${movingUnit.deltaY * cellSize[0]}px)`,
        transition: 'transform 0.8s ease',
        padding: '0px',
    } : {
        padding: '0px',
    };

    const frameX = x + (spriteWidth) * currentFrame;

    const sprBack = {
        margin: 'auto',
        backgroundImage: `url(${imgSrc})`,
        backgroundPosition: `-${frameX}px -${y}px`,
        width: `${spriteWidth * scale}px`,
        height: `${spriteHeight * scale}px`,
        backgroundSize: backgroundSize,
        // transform: wayOfSee,
        transition: 'none'
    };

    const textStyle = {
        textAlign: 'right',
        backgroundColor: 'rgb(128, 176, 240)',
        borderRadius: '2px',
        border: '2px solid rgb(54, 132, 234)',
        padding: `${2 * scale}px ${3 * scale}px`,
        fontSize: `${19 * scale}pt`
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        width: '95%'
    };

    return (
        <td style={{ ...style, ...cellStyle }} className={className} onClick={onClick}>
            {(entity.state === "BLOCKED" || entity.amount > 0) && (
                <div style={containerStyle}>
                    <div style={sprBack}></div>
                    {(entity.state !== "BLOCKED" && <div style={textStyle}>{entity.amount}</div>)}
                </div>
            )}
        </td>
    );
};

export default Unit;

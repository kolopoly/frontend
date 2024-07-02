import GameScreen from "./GameScreen";
import {useEffect, useState} from "react";

export default function Index() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
        scale: window.innerWidth / 1728,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
                scale: window.innerWidth / 1728,
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <GameScreen width={windowSize.width} height={windowSize.height} scale={windowSize.scale}/>
    );
}

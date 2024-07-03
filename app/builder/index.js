import Builder from "./Builder";
import {useEffect, useState} from "react";

export default function Index() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
        scale: Math.min(window.innerWidth / 1728, window.innerHeight / 959)
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
                scale: Math.min(window.innerWidth / 1728, window.innerHeight / 959)
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
            <Builder width={windowSize.width} height={windowSize.height} scale={windowSize.scale}/>
    );
}

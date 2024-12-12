'use client'
import { useState, useEffect } from 'react';

export const useWindowSize = () => {
    const isClient = typeof window === 'object';
    const [size, setSize] = useState({
        width: isClient ? window.innerWidth : 0,
        height: isClient ? window.innerHeight : 0,
    });

    useEffect(() => {
        if (!isClient) {
            return;    
        }

        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isClient]);

    return size;
};
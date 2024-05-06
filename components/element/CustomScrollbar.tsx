'use client'

import React, { useRef, useEffect, ReactNode, useState } from 'react';
import styled from 'styled-components';

const ScrollbarContainer = styled.div`
    height: 100vh;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-track {
        background: #000;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(245, 245, 245, 0.5);
        border-radius: 10px;
    }
`;

interface ScrollProps {
    children: ReactNode;
}

const CustomScrollbar: React.FC<ScrollProps> = ({ children }) => {
    const scrollbarRef = useRef<HTMLDivElement>(null);
    const [showScrollbar, setShowScrollbar] = useState(false);

    useEffect(() => {
        const scrollbar = scrollbarRef.current;
        if (!scrollbar) return;

        const updateScrollbar = () => {
            scrollbar.querySelector('div')!.style.height = `${scrollbar.offsetHeight * (scrollbar.scrollTop / (scrollbar.scrollHeight - scrollbar.offsetHeight))}px`;
        };

        scrollbar.addEventListener('scroll', updateScrollbar);
        updateScrollbar();

        setShowScrollbar(true);

        return () => {
            scrollbar.removeEventListener('scroll', updateScrollbar);
        };
    }, []);

    return (
        <ScrollbarContainer ref={scrollbarRef} style={{ overflowY: showScrollbar ? 'scroll' : 'hidden' }}>
            <div>{children}</div>
        </ScrollbarContainer>
    );
};

export default CustomScrollbar;
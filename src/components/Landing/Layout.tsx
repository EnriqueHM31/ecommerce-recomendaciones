import React from 'react';
import Navbar from './Navbar';
import Cart from '../Productos/Cart';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <Navbar />
            {children}
            <Cart />
            <Footer />
        </>
    );
}

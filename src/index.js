import React from 'react';
import { StatusBar } from 'react-native';
import Navigation from './navigation';

export default function App () {
    return (
        <>
            <StatusBar 
                barStyle='default'
                backgroundColor='transparent'
                translucent
            />
            <Navigation />
        </>
    )
}
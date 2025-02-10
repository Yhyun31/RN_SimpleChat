import React, { useState, useEffect } from 'react';
import { StatusBar, Image} from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import Navigation from './navigations';
import { ProgressProvider, UserProvider } from './contexts';


const App=()=>{
   

    return (
        <ThemeProvider theme={theme}>
            <ProgressProvider>
                <UserProvider>
                    <StatusBar backgroundColor={theme.background} barStyle={'dark-content'} />
                    <Navigation/>
                </UserProvider>
            </ProgressProvider>
        </ThemeProvider>
    );
};

export default App;
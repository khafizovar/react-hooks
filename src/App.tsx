import React from 'react';

import Dashboard from './dashboard'
import ThemeProvider from './providers/theme'

const App = () => {
    return (
        <ThemeProvider>
            <Dashboard />
        </ThemeProvider>
    )
}


export default App
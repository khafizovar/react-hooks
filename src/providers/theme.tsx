import React from 'react';

import { ThemeContext } from '../context'

enum THEME {
    BLACK = 'black',
    WHITE = 'white'
}

interface AppState {
    theme: THEME
}

class App extends React.Component<{}, AppState> {
    constructor(props) {
        super(props)
        this.state = {
            theme: THEME.BLACK
        }
        this.handleSwitchThemeClick = this.handleSwitchThemeClick.bind(this)
    }

    handleSwitchThemeClick() {
        this.setState((prevState) => ({ 
            theme: prevState.theme === THEME.BLACK ? THEME.WHITE : THEME.BLACK
        }))
    }

    render() {
        const { theme } = this.state;

        return (
            <ThemeContext.Provider value={theme}>
                {this.props.children}
                <button
                    className="theme-button"
                    onClick={this.handleSwitchThemeClick}
                >
                    Switch theme
                </button>
            </ThemeContext.Provider>
        )
    }
}


export default App
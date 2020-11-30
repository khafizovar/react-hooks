import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

export default App

const node = document.getElementById('app')

export function mount(Component) {
    ReactDOM.render(<Component />, node);
}

export function unmount() {
    ReactDOM.unmountComponentAtNode(node)
}

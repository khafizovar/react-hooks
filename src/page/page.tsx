import React from 'react';

import { SquareNumber } from '../components'
import { ThemeContext, MoodContext } from '../context'

const COUNTER_MAXIMUM = 100;

type PageState = {
    count: number;
    setCountValue: string;
    windowWidth: number;
    isFetching: boolean;
}

class Page extends React.PureComponent <{}, PageState> {
    constructor(props) {
        super(props);

        this.state = {
            count: 0,
            setCountValue: '',
            windowWidth: window.innerWidth,
            isFetching: false
        }

        this.handleIncrement = this.handleIncrement.bind(this);
        this.handleDecrement = this.handleDecrement.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSetValueClick = this.handleSetValueClick.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount() {
        const { count } = this.state;

        window.addEventListener('resize', this.handleResize)
        document.title = `Count - ${count}`

        this.setState({
            isFetching: true
        });

        fetch('https://www.random.org/integers/?num=1&min=1&max=99&col=11&base=10&format=plain&rnd=new')
            .then(res => res.json())
            .then(number => {
                this.setState({
                    count: number,
                    isFetching: false
                })
            })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    componentDidUpdate() {
        const { count } = this.state;

        document.title = `Count - ${count}`
    }

    handleResize() {
        this.setState({
            windowWidth: window.innerWidth
        })
    }

    handleIncrement() {
        this.setState((state) => ({
            count: (state.count + 1) % COUNTER_MAXIMUM
        }));
    }

    handleDecrement() {
        this.setState((state) => ({
            count: (state.count - 1 + COUNTER_MAXIMUM) % COUNTER_MAXIMUM,
        }));
    }

    handleReset() {
        this.setState({ count: 0 });
    }

    handleChange(event) {
        const value = event.target.value;

        this.setState({
            setCountValue: value,
        });
    }

    handleSetValueClick() {
        const { setCountValue } = this.state;
        this.setState({
            count: Number(setCountValue),
            setCountValue: ''
        })
    }

    render() {
        const { count, setCountValue, windowWidth, isFetching } = this.state;

        return (
            <ThemeContext.Consumer>
                {theme =>
                    <div className={`app ${theme}`}>
                        <main className="App-header">
                            <h2>
                                Class Counter<br />
                                window width {windowWidth}
                            </h2>
                            <div className="counts">
                                <div className="count">
                                    <SquareNumber number={Math.floor(count / 10)} />
                                </div>
                                <div className="count">
                                    <SquareNumber number={count - Math.floor(count / 10) * 10} />
                                </div>
                            </div>
                            <div className="controllers--all">
                                <div className="controllrs--group">
                                    <button disabled={isFetching} onClick={this.handleIncrement} className="controller">+</button>
                                    <button disabled={isFetching} onClick={this.handleDecrement} className="controller">-</button>
                                </div>
                                <div className="controllrs--group offset-top-20">
                                    <input value={setCountValue} onChange={this.handleChange} />
                                    <button disabled={isFetching} className="controller" onClick={this.handleSetValueClick}>Set</button>
                                </div>
                                <button disabled={isFetching} onClick={this.handleReset} className="controller">reset</button>
                            </div>
                        </main>
                        <MoodContext.Consumer>
                            {mood => <div className="mood">{mood}</div>}
                        </MoodContext.Consumer>
                    </div>
                }
            </ThemeContext.Consumer>
        );
    }
}

export default Page;

import React, { useState, useContext, useEffect } from 'react';

import { MoodContext, ThemeContext } from '../context'

import { SquareNumber } from '../components'

const COUNTER_MAXIMUM = 100

const Page = () => {
    const [count, setCount] = useState(44);
    const newValue = useInputState('');
    const substrValue = useInputState('')
    const [isLoading, seIsLoading] = useState(false)
    const theme = useContext(ThemeContext);
    const mood = useContext(MoodContext);
    const customWindowWidth = useWindowWidth()

    // cDM cDU
    useEffect(() => {
        document.title = `Count - ${count}`
    })

    // cDM
    useEffect(() => {
        seIsLoading(true)
        fetch('https://www.random.org/integers/?num=1&min=1&max=99&col=11&base=10&format=plain&rnd=new')
            .then(res => res.json())
            .then(number => {
                setCount(number)
                seIsLoading(false)
            })
    }, [])

    function handleIncrement () {
        setCount((count + 1) % COUNTER_MAXIMUM)
    }

    function handleDecrement () {
        setCount((count - 1 + COUNTER_MAXIMUM) % COUNTER_MAXIMUM)
    }

    function handleReset() {
        setCount(0)
    }

    function handleSetValueClick() {
        setCount(Number(newValue.value) % COUNTER_MAXIMUM);
        newValue.clean()
    }

    return (
        <div className={`app ${theme}`}>
            <main className="App-header hook">
                <h2>
                    Hook Counter<br />
                    w w {customWindowWidth}
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
                        <button disabled={isLoading} onClick={handleIncrement} className="controller">+</button>
                        <button disabled={isLoading} onClick={handleDecrement} className="controller">-</button>
                    </div>
                    <div className="controllrs--group offset-top-20">
                        <input value={newValue.value} onChange={newValue.onChange} />
                        <button disabled={isLoading} onClick={handleSetValueClick} className="controller">Set</button>
                    </div>
                    <div className="controllrs--group offset-top-20">
                        <input value={substrValue.value} onChange={substrValue.onChange} />
                        <button disabled={isLoading} onClick={() => {}} className="controller">Substruct</button>
                    </div>
                    <button disabled={isLoading} onClick={handleReset} className="controller">reset</button>
                </div>
            </main>
            <div className="mood">{mood}</div>
        </div>
    )
}

function useInputState(defaultValue) {
    const [value, setValue] = useState(defaultValue)

    function handleInputChange(event) {
        setValue(event.target.value)
    }

    function clean() {
        setValue('')
    }

    return {
        value,
        onChange: handleInputChange,
        clean
    }
}

function useWindowWidth() {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth)
        }
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    return windowWidth
}

export default Page;

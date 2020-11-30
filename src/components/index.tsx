import React from 'react'
import classnames from 'classnames';

import NUMBERS from '../data';

const Square = ({ isOpended }) => (
    <div className={classnames('cell', 'grid-cell', isOpended && 'is-opened')}></div>
)

export const SquareNumber = ({ number }) => (
    <>
        {Array.from(Array(15))
            .map((_, index) => NUMBERS[number][index])
            .map((isOpened, index) => <Square key={index} isOpended={isOpened} />)
        }
    </>
)

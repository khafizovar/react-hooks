import React from 'react';

import { MoodContext } from './context'

import Page from './page/page';
import HookPage from './hooks/hooks-page';

const Dashboard = () => (
    <>
        <MoodContext.Provider value="😓">
            <Page />
        </MoodContext.Provider>
        <MoodContext.Provider value="😍">
            <HookPage />
        </MoodContext.Provider>
    </>
)

export default Dashboard
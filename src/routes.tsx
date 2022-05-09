import * as React from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import User from './components/pages/User'
import Dashboard from './components/pages/Dashboard'

const R = () => (
    <Router>
        <Routes>
            <Route element={<Dashboard/>} path={'/'} />
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Route element={<User/>}  path={'/users'} />
        </Routes>
    </Router>
)

export default R

import React from 'react';
import App from './App';
import Anime from './Anime';
import List from './List';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const AppRoutes = () => {
    return(
        <Router>
            <Routes>
                <Route path='/' element={<App/>}/>
                <Route path='/list' element={<List/>}/>
                <Route path='/Anime' element={<Anime/>}/>
            </Routes>
        </Router>
    )
}

export default AppRoutes;
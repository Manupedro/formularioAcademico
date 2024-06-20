import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './Form';
import Chart from './Chart';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Form />} />
                <Route path="/analysis" element={<Chart />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;

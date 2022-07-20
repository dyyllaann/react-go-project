import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from '@mui/material';

// Routes
import App from './App';
import PatientDisplay from './routes/PatientDisplay';
import Success from './routes/Success';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<nav>
			<Link href="/" underline="hover">Home</Link>
			<Link href="/admin" underline="hover">Admin Control Panel</Link>
		</nav>
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="/admin" element={<PatientDisplay />} />
			<Route path="/success" element={<Success />} />
		</Routes>
	</BrowserRouter>
);

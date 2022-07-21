import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PatientForm from './components/PatientForm';
import PatientDisplay from './components/PatientDisplay';
import Success from './components/Success';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "@mui/material";

ReactDOM.render(
	<BrowserRouter>
		<nav>
			<Link href="/" underline="hover">
				Home
			</Link>
			<Link href="/admin" underline="hover">
				Admin Control Panel
			</Link>
		</nav>
		<Routes>
			<Route path="/" element={<PatientForm />} />
			<Route path="/admin" element={<PatientDisplay />} />
			<Route path="/success" element={<Success />} />
		</Routes>
	</BrowserRouter>,
	document.getElementById("root")
);

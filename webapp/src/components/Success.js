import * as React from "react";
import { Link, Container } from "@mui/material";
import { Card } from "@mui/material";
import { CssBaseline } from "@mui/material";

export default function Success() {
	return (
		<Container component="main" maxWidth="xs" className="App">
			<Card
				sx={{
					marginTop: '50%',
					paddingLeft: 5,
					paddingRight: 5,
					height: 200,
					textAlign: "center",
				}}
			>
				<CssBaseline />
				<h1>Success!</h1>
				<p>Your form has been submitted.</p>
				<Link href="https://www.donefirst.com/">Return to Done ADHD.</Link>
			</Card>
		</Container>
	);
}

import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import axios from "axios";

export const ENDPOINT = "http://localhost:8080";

export default function SignUp() {
	const [appointmentTimeValue, setAppointmentTimeValue] = React.useState(
		new Date()
	);
	
	const [dateOfBirthValue, setDateOfBirthValue] = React.useState(
		null
	);

	const [publicId, setPublicId] = React.useState();

  async function getDataLength() {
		try {
			const response = await axios.get("http://localhost:8080/patients");
			return response.data.length;
		} catch (error) {
			console.error(error);
		}
	}

  let handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8080/patients",
        {
          id: (await getDataLength() + 1).toString(),
          name: e.target.name.value,
          dateOfBirth: dateOfBirthValue,
          phoneNumber: e.target.phoneNumber.value,
          email: e.target.email.value,
          address: e.target.address.value,
          appointmentTime: appointmentTimeValue,
					photo: publicId,
        }
      )
      .then((res) => {
        console.log(`Entry added: ${res.data}`);
        window.location = "/success";
      })
      .catch((err) => {
        console.log(err);
      });
  };

	var myWidget = window.cloudinary.createUploadWidget(
		{
			cloudName: "dctj8c2ow",
			uploadPreset: "vtrqepxd",
		},
		(error, result) => {
			if (!error && result && result.event === "success") {
				console.log("Image uploaded. Address: " + result.info.secure_url );
				return setPublicId(result.info.secure_url)
			}
		}
	);

	return (
		<Container component="main" maxWidth="xs">
			<Card
				sx={{
					paddingLeft: 5,
					paddingRight: 5,
				}}
			>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<div className="image-crop">
						<img
							src="https://uploads-ssl.webflow.com/622daf6c1921b16b0a83aa84/622daf6c1921b1509e83ab79_21%40logo.png"
							alt="logo"
						></img>
					</div>
					<Typography component="h1" variant="h5">
						Request an Appointment
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									autoComplete="name"
									name="name"
									required
									fullWidth
									id="name"
									label="Name"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12}>
								<LocalizationProvider dateAdapter={AdapterDateFns}>

								<DatePicker
									required
									renderInput={(params) => <TextField {...params} fullWidth autoComplete="bday"/>}
									name="dateOfBirth"
									label="Date of Birth"
									id="dateOfBirth"
									value={dateOfBirthValue}
									onChange={(newValue) => {
										setDateOfBirthValue(newValue);
									}}
									/>
								</LocalizationProvider>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="phoneNumber"
									label="Phone Number"
									name="phoneNumber"
									autoComplete="phone"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="address"
									label="Address"
									name="address"
									autoComplete="address"
								/>
							</Grid>
							<Grid item xs={12}>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DateTimePicker
										required
										renderInput={(params) => (
											<TextField {...params} fullWidth />
										)}
										name="appointmentTime"
										label="Appointment Time"
										id="appointmentTime"
										value={appointmentTimeValue}
										onChange={(newValue) => {
											setAppointmentTimeValue(newValue);
										}}
									/>
								</LocalizationProvider>
							</Grid>
							<Grid item xs={12}>
								<Button
									id="upload_widget"
									className="cloudinary-button"
									type="button"
									onClick={myWidget.open}
									variant="outlined"
								>
									Upload Photo ID
								</Button>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Request Appointment
						</Button>
					</Box>
				</Box>
			</Card>
		</Container>
	);
}
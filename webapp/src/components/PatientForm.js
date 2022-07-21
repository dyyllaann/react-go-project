import * as React from "react";
/* Material UI Imports */
import { Button, CssBaseline, TextField, Grid, Box, Typography, Container, Card } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

/* Axios HTTP Client Import */
import axios from "axios";

/* Resource Imports */
import logo from "../images/logo.png";

/* Server Exports */
export const ENDPOINT = "http://localhost:8080";

export default function Form() {
	/* State Declarations */
	const [dateOfBirthValue, setDateOfBirthValue] = React.useState(null);
	const [appointmentTimeValue, setAppointmentTimeValue] = React.useState(new Date());
	const [publicId, setPublicId] = React.useState();

	/* Get current length of data entries for assigning ID */
	async function getDataLength() {
		try {
			const response = await axios.get(`${ENDPOINT}/patients`);
			return response.data.length;
		} catch (error) {
			console.error(error);
		}
	}

	/* Button Confirmation Style */
	const [buttonText, setButtonText] = React.useState("Upload Photo ID");
	const [buttonColor, setButtonColor] = React.useState("primary");
	const [buttonVariant, setButtonVariant] = React.useState("outlined");

	/* Submit Handler */
	let handleSubmit = async (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:8080/patients", {
				id: ((await getDataLength()) + 1).toString(),
				name: e.target.name.value,
				dateOfBirth: dateOfBirthValue,
				phoneNumber: e.target.phoneNumber.value,
				email: e.target.email.value,
				address: e.target.address.value,
				appointmentTime: appointmentTimeValue,
				photo: publicId,
			})
			.then((res) => {
				console.log(`Entry added: ${res.data}`);
				window.location = "/success";
			})
			.catch((err) => {
				console.log(err);
			});
	};

	/* Cloudinary (Image Upload) */
	var myWidget = window.cloudinary.createUploadWidget(
		{
			cloudName: "dctj8c2ow",
			uploadPreset: "vtrqepxd",
		},
		(error, result) => {
			if (!error && result && result.event === "success") {
				console.log("Image uploaded. Address: " + result.info.secure_url);
				setButtonText("Image Uploaded");
				setButtonColor("success");
				setButtonVariant("contained");
				return setPublicId(result.info.secure_url);
			}
		}
	);

	return (
		<Container component="main" maxWidth="xs">
			<Card
				sx={{
					marginTop: 3,
					marginBottom: 3,
					paddingLeft: 5,
					paddingRight: 5,
				}}
			>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 2,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<img style={{padding: '10px'}} src={logo} alt="logo"></img>
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
										renderInput={(params) => (
											<TextField {...params} fullWidth autoComplete="bday" />
										)}
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
								<Box
									display="flex"
									justifyContent="center"
									alignItems="center"
								>
									<Button
										id="upload_widget"
										className="cloudinary-button"
										type="button"
										onClick={myWidget.open}
										variant={buttonVariant}
										color={buttonColor}
									>
										{buttonText}
									</Button>
								</Box>
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

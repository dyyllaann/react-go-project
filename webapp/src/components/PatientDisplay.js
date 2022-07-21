import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

/* Server Imports */
import useSWR from "swr";

/* Server Exports */
export const ENDPOINT = "http://localhost:8080";

// Create each array entry
function createData(
	id,
	name,
	dateOfBirth,
	phoneNumber,
	email,
	address,
	photo,
	appointmentTime
) {
	return {
		id,
		name,
		dateOfBirth,
		phoneNumber,
		email,
		address,
		photo,
		appointmentTime,
	};
}

export default function DataTable() {
	// Fetch data
	const fetcher = (url) =>
		fetch(`${ENDPOINT}/${url}`).then((res) => res.json());
	const { data } = useSWR("patients", fetcher);

	// Map patient data to array
	const rows = [];
	data?.map((patient) => {
		return rows.push(
			createData(
				patient.id,
				patient.name,
				patient.dateOfBirth,
				patient.phoneNumber,
				patient.email,
				patient.address,
				patient.photo,
				patient.appointmentTime
			)
		);
	});

	// Create columns and header
	const columns = [
		{ field: "id", headerName: "ID" },
		{ field: "name", headerName: "Name", flex: 1 },
		{ field: "dateOfBirth", headerName: "Date of Birth", flex: 1 },
		{ field: "phoneNumber", headerName: "Phone Number", flex: 1 },
		{ field: "email", headerName: "Email", flex: 1 },
		{ field: "address", headerName: "Address", flex: 1.5 },
		{
			field: "photo",
			headerName: "Photo",
			renderCell: (params) => <a href={params.value}>View Photo</a>,
		},
		{ field: "appointmentTime", headerName: "Appointment Time", flex: 1 },
	];

	return (
		<div style={{ height: "100vh", width: "100%" }}>
			<DataGrid sx={{ background: "#fff" }} rows={rows} columns={columns} />
		</div>
	);
}
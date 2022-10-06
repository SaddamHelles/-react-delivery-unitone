import {
	Button,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './packagesStyle.css';

const Packages = ({ appData, setAppData }) => {
	const [open, setOpen] = React.useState(false);

	// handle function to open popup modal to add new package
	const handleClickOpen = () => {
		setOpen(true);
	};

	// handle function to close popup modal to add new package
	const handleClose = () => {
		setOpen(false);
	};
	const [sortFlag, setSortFlag] = useState(false);

	// Sorting packages array ascending and descending by shippingOrder proparty
	const handlerSorting = () => {
		const sortedPackage = appData.packages
			.sort((a, b) =>
				!sortFlag ? a.shippingOrder - b.shippingOrder : b.shippingOrder - a.shippingOrder
			)
			.map((item, i) => item);
		setAppData({ ...appData, packages: sortedPackage });
		setSortFlag(!sortFlag);
	};

	// Show the customer name by his id not from it object
	const nameById = (customerid) => {
		const custName = appData.customers.find((cus) => cus.id === customerid);
		return custName?.name;
	};

	// heandler of deleting packages by its packageId
	const handleDelete = async (id) => {
		try {
			const packagesList = appData.packages.filter((pack) => pack.id !== id);
			setAppData({ ...appData, packages: packagesList });
		} catch (err) {
			console.log('Error: ', err.message);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		const { elements } = e.target;
		const newPackage = {
			id: `pak${Math.floor(Math.random() * 1000)}`,
			weight: elements.weight.value + 'kg',
			customerid: +elements.customerid.value,
			price: +elements.price.value,
			shippingOrder: appData.packages[appData.packages.length - 1].shippingOrder + 1,
		};

		setAppData({ ...appData, packages: [...appData.packages, newPackage] });
		handleClose();
	};
	return (
		<Box>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow sx={{ fontWeight: 'bold' }}>
							<TableCell>id</TableCell>
							<TableCell>Customer Name</TableCell>
							<TableCell>Weight</TableCell>
							<TableCell>Price</TableCell>
							<TableCell>
								<IconButton
									size="large"
									edge="start"
									color="inherit"
									aria-label="menu"
									onClick={handleClickOpen}
								>
									<AddIcon />
								</IconButton>
							</TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{appData.packages?.map((row) => {
							return (
								<TableRow
									key={row.name + row.id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{row.id}
									</TableCell>
									<TableCell>{nameById(row.customerid) ?? 'No name'}</TableCell>
									<TableCell>{row.weight}</TableCell>

									<TableCell>{row.price}</TableCell>

									<TableCell>
										<Button variant="contained" onClick={() => handleDelete(row.id)}>
											Delete
										</Button>
									</TableCell>
									<TableCell>
										<Button variant="contained" onClick={handlerSorting}>
											<ArrowUpwardIcon />
											<ArrowDownwardIcon />
										</Button>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>New Package Form</DialogTitle>
				<DialogContent>
					<DialogContentText>
						In order to add new package you have to fill these field
					</DialogContentText>
					<form action="/" method="POST" onSubmit={submitHandler}>
						<TextField
							autoFocus
							margin="dense"
							id="customerid"
							name="customerid"
							label="Customer Id"
							type="text"
							fullWidth
							variant="standard"
						/>
						<TextField
							autoFocus
							margin="dense"
							id="weight"
							name="weight"
							label="Weight"
							type="number"
							fullWidth
							variant="standard"
						/>

						<TextField
							autoFocus
							margin="dense"
							id="price"
							name="price"
							label="Price"
							type="number"
							fullWidth
							variant="standard"
						/>
						<DialogActions>
							<Button onClick={handleClose}>Cancel</Button>
							<Button type="submit" onClick={handleClose}>
								Add Package
							</Button>
						</DialogActions>
					</form>
				</DialogContent>
			</Dialog>
		</Box>
	);
};

export default Packages;

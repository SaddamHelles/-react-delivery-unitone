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

const Packages = ({ packages, setPackages, customers }) => {
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
		const sortedPackage = packages
			.sort((a, b) =>
				!sortFlag ? a.shippingOrder - b.shippingOrder : b.shippingOrder - a.shippingOrder
			)
			.map((item, i) => item);
		setPackages(sortedPackage);
		setSortFlag(!sortFlag);
		console.log('sortedPackage: ', sortedPackage);
		//a.shippingOrder > b.shippingOrder ? 1 : b.shippingOrder > a.shippingOrder ? -1 : 0
	};

	// Show the customer name by his id not from it object
	const nameById = (customerid) => {
		const custName = customers.find((cus) => cus.id === customerid);
		return custName?.name;
	};

	// heandler of deleting packages by its packageId
	const handleDelete = async (id) => {
		try {
			const packagesList = packages.filter((pack) => pack.id !== id);
			setPackages(packagesList);
		} catch (err) {
			console.log('Error: ', err.message);
		}
	};
	return (
		<Box>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
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
						{packages?.map((row) => {
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
					<TextField
						autoFocus
						margin="dense"
						id="customerid"
						label="Customer Id"
						type="text"
						fullWidth
						variant="standard"
					/>
					<TextField
						autoFocus
						margin="dense"
						id="weight"
						label="Weight"
						type="text"
						fullWidth
						variant="standard"
					/>

					<TextField
						autoFocus
						margin="dense"
						id="price"
						label="Price"
						type="number"
						fullWidth
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleClose}>Add Package</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default Packages;

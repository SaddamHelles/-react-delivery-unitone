import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const AddPackageModal = ({ appData, setAppData, open, setOpen }) => {
	// handle function to close popup modal to add new package
	const handleClose = () => {
		setOpen(false);
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
	);
};

export default AddPackageModal;

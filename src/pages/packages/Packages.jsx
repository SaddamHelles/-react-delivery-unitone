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
import './packagesStyle.css';
import AddPackageModal from '../../components/modal/AddPackageModal';

const Packages = ({ appData, setAppData }) => {
	const [sortFlag, setSortFlag] = useState(false);
	const [open, setOpen] = React.useState(false);

	// handle function to open popup modal to add new package
	const handleClickOpen = () => {
		setOpen(true);
	};
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
			<AddPackageModal appData={appData} setAppData={setAppData} setOpen={setOpen} open={open} />
		</Box>
	);
};

export default Packages;

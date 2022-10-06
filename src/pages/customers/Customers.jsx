// import { ReviewsSharp } from '@mui/icons-material';
import {
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import React from 'react';
import './customersStyle.css';
import { Link } from 'react-router-dom';

const Customers = ({ customers, setCustomers }) => {
	// heandler of deleting customers by its customersId and reset the new data using setCustomers function
	const handleDelete = async (id) => {
		try {
			const customerList = customers.filter((cus) => cus.id !== id);
			setCustomers(customerList);
		} catch (err) {
			console.log('Error: ', err.message);
		}
	};
	return (
		<div>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell sx={{ fontWeight: 'bold' }}>id</TableCell>
							<TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{customers?.map((row) => {
							return (
								<TableRow
									key={row.id + row.name}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{row.id}
									</TableCell>
									<TableCell>{row.name}</TableCell>
									<TableCell>
										<Button variant="contained">
											<Link
												to={{
													pathname: '/invoices',
													search: `?id=${row.id}`,
												}}
												// to={`/invoices/${row.id}`}
												style={{ textDecoration: 'none', color: 'white' }}
											>
												Create Invoice
											</Link>
										</Button>
									</TableCell>
									<TableCell>
										<Button variant="contained" onClick={() => handleDelete(row.id)}>
											Delete
										</Button>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default Customers;

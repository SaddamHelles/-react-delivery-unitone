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
import React, { Fragment } from 'react';
import { useEffect } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './invoicesStyle.css';
const Invoices = ({ invoicesData, setInvoices, customers, packages }) => {
	const { search } = useLocation();
	const { id } = queryString.parse(search);
	console.log('values.id: ', id);

	// totalValue function to  gathering values numerically for each customer
	const totalValue = (packages, targetField, customerid) => {
		// parseInt function was used to extract the number from weight value and gathering values numerically
		const totalValue = packages.reduce(
			(acc, current) =>
				current.customerid === customerid
					? parseInt(acc[targetField]) + parseInt(current[targetField])
					: acc[targetField],
			0
		);
		return totalValue;
	};

	// console.log('invoicesList: ', invoicesList);
	// console.log("packages: ", packages);

	useEffect(() => {
		let newPackages = packages;
		if (id) {
			newPackages = packages?.filter((pack) => pack.customerid === Number(id));
		}
		newPackages = newPackages?.map((pack) => {
			return {
				customerName: customers.find((cus) => cus.id === pack.customerid).name,
				weight: pack.weight,
				price: pack.price,
				customerid: pack.customerid,
			};
		});
		setInvoices(newPackages);
	}, [packages, customers]);
	console.log('invoicesData: ', invoicesData);
	return (
		<Fragment>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Customer Name</TableCell>
							<TableCell>Weight</TableCell>
							<TableCell>Price</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{invoicesData?.map((row) => {
							return (
								<TableRow
									key={Math.trunc(Math.random() * 1000)}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{row.customerName}
									</TableCell>
									<TableCell>{row.weight}</TableCell>
									<TableCell>{row.weight}</TableCell>
								</TableRow>
							);
						})}
						<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							<TableCell></TableCell>
							<TableCell>
								Totle weight:{' '}
								{invoicesData?.reduce((acc, cur) => acc + parseInt(cur.weight), 0) + ' kg'}
							</TableCell>
							<TableCell>
								Totle price: {invoicesData?.reduce((acc, cur) => acc + parseInt(cur.price), 0)}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Fragment>
	);
};
//
export default Invoices;

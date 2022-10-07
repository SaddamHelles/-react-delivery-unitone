import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const CustomDrawer = ({ open, setOpen, setPageName }) => {
	return (
		<Drawer
			anchor={'left'}
			open={open}
			onClose={() => {
				setOpen(false);
			}}
		>
			<List style={{ width: '300px' }}>
				<ListItem button>
					<Link
						to="/"
						onClick={() => {
							setPageName('Home 🏠');
							setOpen(false);
						}}
					>
						<ListItemText primary={'Home'} />
					</Link>
				</ListItem>
				<ListItem button>
					<Link
						to="/packages"
						onClick={() => {
							setPageName('Packages 📦');
							setOpen(false);
						}}
					>
						<ListItemText primary={'Packages'} />
					</Link>
				</ListItem>
				<ListItem button>
					<Link
						to="/customers"
						onClick={() => {
							setPageName('Customers 💁🏽‍♂️');
							setOpen(false);
						}}
					>
						<ListItemText primary={'Customers'} />
					</Link>
				</ListItem>
				<ListItem button>
					<Link
						to="/invoices"
						onClick={() => {
							setPageName('Invoices 💸');
							setOpen(false);
						}}
					>
						<ListItemText primary={'Invoices'} />
					</Link>
				</ListItem>
			</List>
		</Drawer>
	);
};

export default CustomDrawer;

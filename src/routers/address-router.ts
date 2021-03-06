import express from 'express';
import AppConfig from '../config/app';
import { adminGuard } from '../middleware/auth-middleware';

export const AddressRouter = express.Router(); 

const addressServ = AppConfig.addressServ;

AddressRouter.get('', adminGuard, async (req, resp)=> {
	try{
		let payload = await addressServ.getAllAddress();
		resp.status(200).json(payload);
	}catch(e){
		resp.status(e.statusCode).json(e);
	}
	resp.send();
});

AddressRouter.get('/:id', async (req, resp) => {
	const id = +req.params.id;
	try{
		let payload = await addressServ.getAddressById(id);
		resp.status(200).json(payload);
	}catch(e){
		resp.status(e.statusCode).json(e);
	}
	resp.send();
});

AddressRouter.post('', async (req, resp) => {

	console.log('POST REQUEST RECEIVED AT /addresss');
	try {
		let newAddress = await addressServ.saveAddress(req.body);
		return resp.status(201).json(newAddress);
	} catch (e) {
		return resp.status(e.statusCode).json(e);
	}
});

AddressRouter.patch('', async (req, resp) => {

	console.log('PATCH REQUEST RECEIVED AT /addresss');
	try {
		let updAddress = await addressServ.updateAddress(req.body);
		return resp.status(200).json(updAddress);
	} catch (e) {
		return resp.status(e.statusCode).json(e);
	}
	resp.send();
});

AddressRouter.delete('', async (req, resp) => {

	console.log('DELETE REQUEST RECEIVED AT /addresss');
	try {
		let delAddress = await addressServ.deleteAddressById(req.body.address_id);
		return resp.status(204).json(delAddress);
	} catch (e) {
		return resp.status(e.statusCode).json(e);
	}

});
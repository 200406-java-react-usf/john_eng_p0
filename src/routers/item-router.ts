import express from 'express';
import AppConfig from '../config/app';

export const ItemRouter = express.Router(); 

const itemServ = AppConfig.itemServ;

ItemRouter.get('', async (req, resp)=> {
	try{
		let payload = await itemServ.getAllItem();
		resp.status(200).json(payload);
	}catch(e){
		resp.status(500).json(e);
	}
	resp.send();
});

ItemRouter.get('/:id', async (req, resp) => {
	const id = +req.params.id;
	try{
		let payload = await itemServ.getItemById(id);
		console.log('hello', payload);
		resp.status(200).json(payload);
	}catch(e){
		resp.status(400).json(e);
	}
	resp.send();
});

ItemRouter.post('', async (req, resp) => {

	console.log('POST REQUEST RECEIVED AT /items');
	console.log(req.body);
	try {
		let newItem = await itemServ.saveItem(req.body);
		return resp.status(201).json(newItem);
	} catch (e) {
		return resp.status(400).json(e);
	}
});

ItemRouter.patch('', async (req, resp) => {

	console.log('PATCH REQUEST RECEIVED AT /items');
	console.log(req.body);
	try {
		let updItem = await itemServ.updateItem(req.body);
		return resp.status(200).json(updItem);
	} catch (e) {
		return resp.status(400).json(e);
	}
	resp.send();
});

ItemRouter.delete('', async (req, resp) => {

	console.log('DELETE REQUEST RECEIVED AT /items');
	try {
		let delItem = await itemServ.deleteItemById(req.body.item_id);
		return resp.status(204).json(delItem);
	} catch (e) {
		return resp.status(400).json(e);
	}

});
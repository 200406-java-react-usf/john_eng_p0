import express from 'express';
import AppConfig from '../config/app';

export const EventRouter = express.Router(); 

const eventServ = AppConfig.eventServ;

EventRouter.get('', async (req, resp)=> {
	try{
		let payload = await eventServ.getAllEvent();
		resp.status(200).json(payload);
	}catch(e){
		resp.status(500).json(e);
	}
	resp.send();
});

EventRouter.get('/:id', async (req, resp) => {
	const id = +req.params.id;
	try{
		let payload = await eventServ.getEventById(id);
		resp.status(200).json(payload);
	}catch(e){
		resp.status(e.statusCode).json(e);
	}
	resp.send();
});

EventRouter.post('', async (req, resp) => {

	console.log('POST REQUEST RECEIVED AT /events');
	try {
		let newEvent = await eventServ.saveEvent(req.body);
		return resp.status(201).json(newEvent);
	} catch (e) {
		return resp.status(e.statusCode).json(e);
	}
});

EventRouter.patch('', async (req, resp) => {

	console.log('PATCH REQUEST RECEIVED AT /events');
	try {
		let updEvent = await eventServ.updateEvent(req.body);
		return resp.status(200).json(updEvent);
	} catch (e) {
		return resp.status(e.statusCode).json(e);
	}

});

EventRouter.delete('', async (req, resp) => {

	console.log('DELETE REQUEST RECEIVED AT /events');
	try {
		let delEvent = await eventServ.deleteEventById(req.body.event_id);
		return resp.status(204).json(delEvent);
	} catch (e) {
		return resp.status(e.statusCode).json(e);
	}

});
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
		console.log('hello', payload);
		resp.status(200).json(payload);
	}catch(e){
		resp.status(400).json(e);
	}
	resp.send();
});

// EventRouter.post('', async (req, resp) => {

//     console.log('POST REQUEST RECEIVED AT /events');
//     console.log(req.body);
//     try {
//         let newEvent = await eventServ.saveEvent(req.body);
//         return resp.status(201).json(newEvent);
//     } catch (e) {
//         return resp.status(400).json(e);
//     }

// });
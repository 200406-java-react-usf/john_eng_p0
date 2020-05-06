import express from 'express';
import AppConfig from '../config/app';
import { adminGuard } from '../middleware/auth-middleware';

export const EventMemberRouter = express.Router(); 

const eventMemberServ = AppConfig.eventMemberServ;

EventMemberRouter.get('', adminGuard, async (req, resp)=> {
	try{
		let payload = await eventMemberServ.getAllEventMember();
		resp.status(200).json(payload);
	}catch(e){
		resp.status(e.statusCode).json(e);
	}
	resp.send();
});

EventMemberRouter.get('/:id', async (req, resp) => {
	const id = +req.params.id;
	try{
		let payload = await eventMemberServ.getEventMemberById(id);
		resp.status(200).json(payload);
	}catch(e){
		resp.status(e.statusCode).json(e);
	}
	resp.send();
});

EventMemberRouter.post('', async (req, resp) => {

	console.log('POST REQUEST RECEIVED AT /eventMembers');
	try {
		let newEventMember = await eventMemberServ.saveEventMember(req.body);
		return resp.status(201).json(newEventMember);
	} catch (e) {
		return resp.status(e.statusCode).json(e);
	}
});

EventMemberRouter.delete('', async (req, resp) => {

	console.log('DELETE REQUEST RECEIVED AT /eventMembers');
	try {
		let delEventMember = await eventMemberServ.deleteEventMemberById(req.body.event_id, req.body.member_id);
		return resp.status(204).json(delEventMember);
	} catch (e) {
		return resp.status(e.statusCode).json(e);
	}

});
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
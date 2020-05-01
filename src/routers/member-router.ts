import express from 'express';
import AppConfig from '../config/app';

export const MemberRouter = express.Router(); 

const memberServ = AppConfig.memberServ;

MemberRouter.get('', async (req, resp)=> {
	try{
        let payload = await memberServ.getAllMember();
		resp.status(200).json(payload);
	}catch(e){
		resp.status(500).json(e);
	}
	resp.send();
});

MemberRouter.get('/:id', async (req, resp) => {
    const id = +req.params.id;
    try{
        let payload = await memberServ.getMemberById(id);
        console.log('hello', payload);
        resp.status(200).json(payload);
    }catch(e){
        resp.status(400).json(e);
    }
    resp.send();
})
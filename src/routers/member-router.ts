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
		resp.status(200).json(payload);
	}catch(e){
		resp.status(e.statusCode).json(e);
	}
	resp.send();
});

MemberRouter.post('', async (req, resp) => {

	console.log('POST REQUEST RECEIVED AT /members');
	try {
		let newMember = await memberServ.saveMember(req.body);
		return resp.status(201).json(newMember);
	} catch (e) {
		return resp.status(e.statusCode).json(e);
	}
});

MemberRouter.patch('', async (req, resp) => {

	console.log('PATCH REQUEST RECEIVED AT /members');
	try {
		let updMember = await memberServ.updateMember(req.body);
		return resp.status(200).json(updMember);
	} catch (e) {
		return resp.status(e.statusCode).json(e);
	}

});

MemberRouter.delete('', async (req, resp) => {

	console.log('DELETE REQUEST RECEIVED AT /members');
	try {
		let delMember = await memberServ.deleteMemberById(req.body.member_id);
		return resp.status(204).json(delMember);
	} catch (e) {
		return resp.status(e.statusCode).json(e);
	}

});
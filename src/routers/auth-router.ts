import express from 'express';
import AppConfig from '../config/app';
import { Principal } from '../dtos/principal';


export const AuthRouter = express.Router();

const memberService = AppConfig.memberServ;

AuthRouter.get('', (req, resp) => {
	delete req.session.principal;
	resp.status(204).send();
});

AuthRouter.post('', async (req, resp) => {

	try {

		const { username, password } = req.body;
		let authMember = await memberService.authenticateMember(username, password);
		let payload = new Principal(authMember.member_id, authMember.username, authMember.role);
		req.session.principal = payload;
		resp.status(200).json(payload);
        
	} catch (e) {
		resp.status(e.statusCode || 500).json(e);
	}

	resp.send();

});
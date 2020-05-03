import dotenv from 'dotenv';
import express from 'express';
import { EventRouter } from './routers/event-router';
import { MemberRouter } from './routers/member-router';
import { AddressRouter } from './routers/address-router';
import { ItemRouter } from './routers/item-router';
import { EventMemberRouter } from './routers/eventMember-router';

import { Pool } from 'pg';

const app = express();

// environment configuration
dotenv.config();

// database configuration
export const connectionPool: Pool = new Pool({
	host: process.env['DB_HOST'],
	port: +process.env['DB_PORT'],
	database: process.env['DB_NAME'],
	user: process.env['DB_USERNAME'],
	password: process.env['DB_PASSWORD'],
	max: 5
});

app.use('/', express.json());

app.use('/events', EventRouter);
app.use('/members', MemberRouter);
app.use('/addresses', AddressRouter);
app.use('/items', ItemRouter);
app.use('/events_members', EventMemberRouter)


app.listen(8000, ()=> {
	console.log('Application running and listening at: http://localhost:8000');
});
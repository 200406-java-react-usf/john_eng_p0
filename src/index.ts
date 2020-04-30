import express from 'express';
import eventData from './data/event_db'
import { EventRouter } from './routers/event-router';

const app = express();

app.use('/', express.json());

app.use('/events', EventRouter);
console.log(eventData);

app.listen(8000, ()=> {
    console.log('Application running and listening at: http://localhost:8000');
})
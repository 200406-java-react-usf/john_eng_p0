import { EventRepository } from './repos/event-repo';
import { Event } from './models/event';
// import App from './config/app'


// const eventSer = App.eventServ;

let newObj = new Event(10, 'Sally Birthday Pary', 'May 25 2020 11:00am', 'May 25 2020 14:00am', 'Looking forward to see you all', 1, 1);

const eventRepo = new EventRepository();

// eventRepo.save(newObj);
// eventSer.saveEvent(newObj);



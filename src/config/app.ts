import { EventRepository } from '../repos/event-repo';
import { EventService } from '../services/event-service';

const eventRepo = new EventRepository();
const eventServ = new EventService(eventRepo);

export default{
    eventServ
}

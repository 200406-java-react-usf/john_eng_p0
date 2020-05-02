import { EventRepository } from '../repos/event-repo';
import { EventService } from '../services/event-service';

import { MemberRepository } from '../repos/member-repo';
import { MemberService } from '../services/member-service';

const eventRepo = new EventRepository();
const eventServ = new EventService(eventRepo);

const memberRepo = new MemberRepository();
const memberServ = new MemberService(memberRepo);

export default{
	eventServ,
	memberServ
};

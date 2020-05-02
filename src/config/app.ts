import { EventRepository } from '../repos/event-repo';
import { EventService } from '../services/event-service';

import { MemberRepository } from '../repos/member-repo';
import { MemberService } from '../services/member-service';

import { AddressRepository } from '../repos/address-repo';
import { AddressService } from '../services/address-service';

const eventRepo = new EventRepository();
const eventServ = new EventService(eventRepo);

const memberRepo = new MemberRepository();
const memberServ = new MemberService(memberRepo);

const addressRepo = new AddressRepository();
const addressServ = new AddressService(addressRepo);
export default{
	eventServ,
	memberServ,
	addressServ
};

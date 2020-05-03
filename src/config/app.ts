import { EventRepository } from '../repos/event-repo';
import { EventService } from '../services/event-service';

import { MemberRepository } from '../repos/member-repo';
import { MemberService } from '../services/member-service';

import { AddressRepository } from '../repos/address-repo';
import { AddressService } from '../services/address-service';

import { ItemRepository } from '../repos/item-repo';
import { ItemService } from '../services/item-service';

import { EventMemberRepository } from '../repos/eventMember-repo';
import { EventMemberService } from '../services/eventMember-service';

const eventRepo = new EventRepository();
const eventServ = new EventService(eventRepo);

const memberRepo = new MemberRepository();
const memberServ = new MemberService(memberRepo);

const addressRepo = new AddressRepository();
const addressServ = new AddressService(addressRepo);

const itemRepo = new ItemRepository();
const itemServ = new ItemService(itemRepo);

const eventMemberRepo = new EventMemberRepository();
const eventMemberServ = new EventMemberService(eventMemberRepo);

export default{
	eventServ,
	memberServ,
	addressServ,
	itemServ,
	eventMemberServ
};

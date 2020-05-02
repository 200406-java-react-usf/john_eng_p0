import { EventSchema, 
		MemberSchema,
	 	AddressSchema} 
	from './schemas';
import { Event } from '../models/event';
import { Member } from '../models/member';
import { Address } from '../models/address';

export function mapEventResultSet(resultSet: EventSchema): Event {
	if (!resultSet){
		return {} as Event;
	}
	return new Event(
		resultSet.event_id,
		resultSet.title,
		resultSet.time_begin,
		resultSet.time_end,
		resultSet.notes,
		resultSet.address_id,
		resultSet.host_id
	);
}

export function mapMemberResultSet(resultSet: MemberSchema): Member {
	if(!resultSet){
		return {} as Member;
	}
	return new Member(
		resultSet.member_id,
		resultSet.first_name,
		resultSet.last_name,
		resultSet.biography,
		resultSet.email,
		resultSet.telephone
	);
}
export function mapAddressResultSet(resultSet: AddressSchema): Address {
	if(!resultSet){
		return {} as Address;
	}
	return new Address(
		resultSet.address_id,
		resultSet.street,
		resultSet.city,
		resultSet.state,
		resultSet.zip
	);
}
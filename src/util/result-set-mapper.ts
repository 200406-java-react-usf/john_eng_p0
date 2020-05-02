import { EventSchema, 
	MemberSchema } 
	from './schemas';
import { Event } from '../models/event';
import { Member } from '../models/member';

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
export interface EventSchema {
	event_id: number,
	title: string,
	time_begin: string,
	time_end: string,
	notes: string,
	address_id: number,
	host_id: number
}

export interface MemberSchema{
	member_id: number,
	first_name: string,
	last_name: string,
	biography: string,
	email: string,
	telephone: string

}
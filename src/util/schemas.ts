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

export interface AddressSchema{
	address_id: number,
    street: string,
    city: string,
    state: string,
    zip:string

}

export interface ItemSchema{
	item_id: number,
    item: string,
    comment: string,
    event_id: number,
    member_id: number,
}

export interface EventMemberSchema{
	event_id: number,
	member_id: number
}
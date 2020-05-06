export class Event{

	//variables
	event_id: number;
	title: string;
	time_begin: Date;
	time_end: Date;
	notes: string;
	address_id: number;
	host_id: number;

	//constructor
	constructor(event_id:number, title:string, time_begin: Date, time_end: Date,
		notes:string, address_id:number, host_id: number){
		this.event_id = event_id; 
		this.title = title; 
		this.time_begin = time_begin;
		this.time_end = time_end;
		this.notes = notes;
		this.address_id = address_id;
		this.host_id = host_id;

	}
}
export class Event{

//variables
event_id: number;
title: string;
location: string;
date: Date;
time_begin: Date;
time_end: Date;
notes: string;
member_id: number;

//constructor
constructor(event_id:number, title:string, location:string, date:Date,
	time_begin:Date, time_end:Date, notes:string, member_id:number){
	this.event_id = event_id; 
	this.title = title; 
	this.location = location;
	this.date = date;
	this.time_begin = time_begin;
	this.time_end = time_end;
	this.notes = notes;
	this.member_id = member_id;

}
}
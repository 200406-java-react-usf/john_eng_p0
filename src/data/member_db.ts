import { Member } from '../models/member';

let id = 1;

//event_id:number, title:string, location:string, date:Date, 
//time_begin:Date, time_end:Date, notes:string, member_id:number){
export default
[
	new Member(id++, 'John', 'Eng', 'I enjoy life', 'john1eng@hotmail.com', '(344)-555-5555'),
	new Member(id++, 'David', 'Ortiz', 'I like to travel', 'how1234@hotmail.com', '(344)-555-5555'),
	new Member(id++, 'Sally', 'Hemanway', 'I like to place a game of chess', 'kong234@hotmail.com', '(344)-555-5555'),
	new Member(id++, 'Methew', 'Garfield', 'Video game maniac', 'tingarf2@hotmail.com', '(344)-555-5555'),
	new Member(id++, 'Daisy', 'Chocolate', 'Chocolate forever', 'pengliol@hotmail.com', '(344)-555-5555'),


];
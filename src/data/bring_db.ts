import { Bring } from '../models/bring';

let id = 1;

//event_id:number, title:string, location:string, date:Date, 
//time_begin:Date, time_end:Date, notes:string, member_id:number){
export default
[
	new Bring(id++, 'potato chips and soda', 'looking forward to see you guys', 1, 1),
	new Bring(id++, 'lasanza, chicken soup, and bake potatos', 'later', 1, 2),
	new Bring(id++, 'forks, spoons and forks', 'later', 1, 3),
	new Bring(id++, 'devil eggs and cellery and carrot sticks', 'later', 1, 4),
	new Bring(id++, 'wine', 'later', 1, 5),

];
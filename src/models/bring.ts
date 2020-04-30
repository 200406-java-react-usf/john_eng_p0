export class Bring{

	bring_id: number;
	stuffs: string;
	comment: string;
	event_id: number;
	member_id: number;

	constructor(bring_id:number, stuffs:string, comment:string, event_id:number, member_id: number){
		this.bring_id = bring_id;
		this.stuffs = stuffs;
		this.comment = comment;
		this.event_id = event_id;
		this.member_id = member_id;

	}

}
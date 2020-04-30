export class Member{

	member_id: number;
	first_name: string;
	last_name: string;
	bio: string;
	email: string;
	telephone: string;

	constructor(member_id: number, first_name: string, last_name: string, bio: string, email: string, telephone: string){
		this.member_id = member_id;
		this.first_name = first_name;
		this.last_name = last_name;
		this.bio = bio;
		this.email = email;
		this.telephone = telephone;
		
	}
}
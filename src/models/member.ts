export class Member{

	member_id: number;
	user_name: string;
	password: string;
	first_name: string;
	last_name: string;
	bio: string;
	email: string;
	telephone: string;

	constructor(member_id: number, user_name: string, password: string, first_name: string, last_name: string, bio: string, email: string, telephone: string){
		this.member_id = member_id;
		this.user_name = user_name;
		this.password = password;
		this.first_name = first_name;
		this.last_name = last_name;
		this.bio = bio;
		this.email = email;
		this.telephone = telephone;
		
	}
}
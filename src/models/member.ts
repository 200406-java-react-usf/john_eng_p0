export class Member{

	member_id: number;
	username: string;
	password: string;
	first_name: string;
	last_name: string;
	biography: string;
	email: string;
	telephone: string;
	role: string;

	constructor(member_id: number, username: string, password: string, first_name: string, last_name: string, biography: string, email: string, telephone: string, role: string){
		this.member_id = member_id;
		this.username = username;
		this.password = password;
		this.first_name = first_name;
		this.last_name = last_name;
		this.biography = biography;
		this.email = email;
		this.telephone = telephone;
		this.role = role;
		
	}
}
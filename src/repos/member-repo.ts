import { CrudRepository } from './crud-repo';
import memberData from '../data/member_db';
import { Member } from '../models/member';

export class MemberRepository implements CrudRepository<Member>{


	getAll(): Promise<Member[]> {

		return new Promise((resolve,reject)=> {

			let members = [];

			for(let member of memberData){
				members.push({...member});
			}

			resolve(members);
		});
	}
	getById(id: number): Promise<Member>{
		return new Promise<Member>((resolve,rejects)=>{

			const member = {...memberData.find(x => x.member_id === id)}
			resolve(member);
		});
	}
	save(newObj: Member): Promise<Member>{
		return new Promise((resolve, rejects)=>{
			newObj.member_id = (memberData.length)+1
			memberData.push(newObj);
			resolve(newObj);
		});
	}
	update(updObj: Member): Promise<boolean>{
		return new Promise((resolve, rejects)=>{
			
			let persistedMember = memberData.find((x)=>x.member_id === updObj.member_id)
			
			persistedMember = updObj;
			
			resolve(true);
		});
	}
	deleteById(id: number): Promise<boolean>{
		return new Promise((resolve, rejects)=>{
			
			//find the index of the model and then use array method to delete it
			
			resolve(true);
		});
	}

}


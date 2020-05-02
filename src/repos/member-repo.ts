import { CrudRepository } from './crud-repo';
import memberData from '../data/member_db';
import { Member } from '../models/member';

import { PoolClient } from 'pg';
import { connectionPool } from '..';
import { mapMemberResultSet } from '../util/result-set-mapper';

export class MemberRepository implements CrudRepository<Member>{


	async getAll(): Promise<Member[]> {

		let client: PoolClient;
		
		try{
			client = await connectionPool.connect();
			let sql = 'select * from app_members;';
			let rs = await client.query(sql);
			return rs.rows.map(mapMemberResultSet);
		}catch(e){
			console.log(e);
		}finally{
			client && client.release;

		}


	}
	getById(id: number): Promise<Member>{
		return new Promise<Member>((resolve,rejects)=>{

			const member = {...memberData.find(x => x.member_id === id)};
			resolve(member);
		});
	}
	save(newObj: Member): Promise<Member>{
		return new Promise((resolve, rejects)=>{
			newObj.member_id = (memberData.length)+1;
			memberData.push(newObj);
			resolve(newObj);
		});
	}
	update(updObj: Member): Promise<boolean>{
		return new Promise((resolve, rejects)=>{
			
			let persistedMember = memberData.find((x)=>x.member_id === updObj.member_id);
			
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


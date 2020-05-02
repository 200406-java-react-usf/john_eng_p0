import { Member } from '../models/member';
import { MemberRepository } from '../repos/member-repo';

export class MemberService{

	constructor(private memberRepo: MemberRepository){
		this.memberRepo = memberRepo;
	}

	async getAllMember() : Promise<Member[]>{

			let result = await this.memberRepo.getAll();
			return result;

	}
	async getMemberById(id: number) : Promise<Member> {

			let result = await this.memberRepo.getById(id);
			return result;

	}

	async saveMember(newObj: Member) : Promise<Member> {

			let result = await this.memberRepo.save(newObj);
			return result;
	}

	async updateMember(updObj: Member) : Promise<boolean> {

			await this.memberRepo.update(updObj);
			return true;

	}

	async deleteMemberById(id: number) : Promise<boolean> {

			await this.memberRepo.deleteById(id);

			return true;

	}
}
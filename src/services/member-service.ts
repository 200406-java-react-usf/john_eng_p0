import { Member } from '../models/member';
import { MemberRepository } from '../repos/member-repo';
import { isValidId, 
	isValidStrings, 
	isValidObject, 
	isPropertyOf, 
	isEmptyObject } from '../util/validator';
import { ResourceNotFoundError, BadRequestError, AuthenticationError } from '../errors/errors';

export class MemberService{

	constructor(private memberRepo: MemberRepository){
		this.memberRepo = memberRepo;
	}

	async getAllMember() : Promise<Member[]>{

		let result = await this.memberRepo.getAll();

		if(isEmptyObject(result))
			throw new ResourceNotFoundError();

		return result.map(this.removePassword);
	}
	async getMemberById(id: number) : Promise<Member> {

		if(!isValidId(id))
			throw new BadRequestError();

		let result = await this.memberRepo.getById(id);

		if(isEmptyObject(result))
			throw new ResourceNotFoundError();

		return this.removePassword(result);
	}

	async saveMember(newObj: Member) : Promise<Member> {

		if(!isValidObject(newObj, 'id'))
			throw new BadRequestError('Invalid property values found in provided member.');

		let result = await this.memberRepo.save(newObj);

		return this.removePassword(result);
	}

	async updateMember(updObj: Member) : Promise<boolean> {

		if(!isValidObject(updObj))
			throw new BadRequestError('Invalid member provided (invalid value found).');

		let result = await this.memberRepo.update(updObj);

		return result;
	}

	async deleteMemberById(id: number) : Promise<boolean> {

		if(!isValidId(id))
			throw new BadRequestError();

		let result = await this.memberRepo.deleteById(id);

		return result;
	}

	async authenticateMember(un: string, pw: string): Promise<Member> {

		try {

			if (!isValidStrings(un, pw)) {
				throw new BadRequestError();
			}

			let authMember: Member;
			
			authMember = await this.memberRepo.getMemberByCredentials(un, pw);
		

			if (isEmptyObject(authMember)) {
				throw new AuthenticationError('Bad credentials provided.');
			}

			return this.removePassword(authMember);

		} catch (e) {
			throw e;
		}

	}
	
	private removePassword(member: Member): Member {
		if(!member || !member.password) return member;
		let usr = {...member};
		delete usr.password;
		return usr;   
	}

}
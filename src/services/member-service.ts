import { Member } from '../models/member';
import { MemberRepository } from '../repos/member-repo';
import { isValidId, 
	isValidStrings, 
	isValidObject, 
	isPropertyOf, 
	isEmptyObject } from '../util/validator'
import { ResourceNotFoundError, BadRequestError } from '../errors/errors';

export class MemberService{

	constructor(private memberRepo: MemberRepository){
		this.memberRepo = memberRepo;
	}

	async getAllMember() : Promise<Member[]>{

		let result = await this.memberRepo.getAll();

		if(isEmptyObject(result))
			throw new ResourceNotFoundError()

		return result;
	}
	async getMemberById(id: number) : Promise<Member> {

		if(!isValidId(id))
			throw new BadRequestError();

		let result = await this.memberRepo.getById(id);

		if(isEmptyObject(result))
			throw new ResourceNotFoundError();

		return result;
	}

	async saveMember(newObj: Member) : Promise<Member> {

		if(!isValidObject(newObj, 'id'))
			throw new BadRequestError('Invalid property values found in provided member.');

		let result = await this.memberRepo.save(newObj);

		return result;
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

}
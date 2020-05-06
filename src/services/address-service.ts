import { Address } from '../models/address';
import { AddressRepository } from '../repos/address-repo';
import { isValidId, 
	isValidObject, 
	isEmptyObject } from '../util/validator';
import { ResourceNotFoundError, BadRequestError } from '../errors/errors';

export class AddressService{

	constructor(private addressRepo: AddressRepository){
		this.addressRepo = addressRepo;
	}

	async getAllAddress() : Promise<Address[]>{

		let result = await this.addressRepo.getAll();
		
		if(isEmptyObject(result))
			throw new ResourceNotFoundError();

		return result;

	}

	async getAddressById(id: number) : Promise<Address> {

		if(!isValidId(id))
			throw new BadRequestError();

		let result = await this.addressRepo.getById(id);

		if(isEmptyObject(result))
			throw new ResourceNotFoundError();
		
		return result;
	}

	async saveAddress(newObj: Address) : Promise<Address> {

		if(!isValidObject(newObj, 'id'))
			throw new BadRequestError('Invalid property values found in provided address.');

		let result = await this.addressRepo.save(newObj);
		
		return result;
	}

	async updateAddress(updObj: Address) : Promise<boolean> {
		if(!isValidObject(updObj))
			throw new BadRequestError('Invalid address provided (invalid value found).');

		let result = await this.addressRepo.update(updObj);

		return result;
	}

	async deleteAddressById(id: number) : Promise<boolean> {
		if(!isValidId(id))
			throw new BadRequestError();

		let result = await this.addressRepo.deleteById(id);

		return result;
	}

}
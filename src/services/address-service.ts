import { Address } from '../models/address';
import { AddressRepository } from '../repos/address-repo';

export class AddressService{

	constructor(private addressRepo: AddressRepository){
		this.addressRepo = addressRepo;
	}

	async getAllAddress() : Promise<Address[]>{

			let result = await this.addressRepo.getAll();

			return result;

	}
	async getAddressById(id: number) : Promise<Address> {

			let result = await this.addressRepo.getById(id);

			return result;
	}

	async saveAddress(newObj: Address) : Promise<Address> {
			let result = await this.addressRepo.save(newObj);
            
			return result;
	}

	async updateAddress(updObj: Address) : Promise<boolean> {
			await this.addressRepo.update(updObj);
			return true;
	}

	async deleteAddressById(id: number) : Promise<boolean> {

			await this.addressRepo.deleteById(id);

			return true;

	}
}
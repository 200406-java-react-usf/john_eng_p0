import { Item } from '../models/item';
import { ItemRepository } from '../repos/item-repo';
import { isValidId, 
	isValidStrings, 
	isValidObject, 
	isPropertyOf, 
	isEmptyObject } from '../util/validator'
import { ResourceNotFoundError, BadRequestError } from '../errors/errors';

export class ItemService{

	constructor(private itemRepo: ItemRepository){

		this.itemRepo = itemRepo;
	}

	async getAllItem() : Promise<Item[]>{

		let result = await this.itemRepo.getAll();

		if(isEmptyObject(result))
			throw new ResourceNotFoundError()

		return result;

	}
	async getItemById(id: number) : Promise<Item> {

		if(!isValidId(id))
			throw new BadRequestError();

		let result = await this.itemRepo.getById(id);

		if(isEmptyObject(result))
			throw new ResourceNotFoundError();

		return result;
	}

	async saveItem(newObj: Item) : Promise<Item> {

		if(!isValidObject(newObj, 'id'))
			throw new BadRequestError('Invalid property values found in provided item.');

		let result = await this.itemRepo.save(newObj);
            
		return result;
	}

	async updateItem(updObj: Item) : Promise<boolean> {

		if(!isValidObject(updObj))
			throw new BadRequestError('Invalid item provided (invalid value found).');
		
		let result = await this.itemRepo.update(updObj);

		return result;
	}

	async deleteItemById(id: number) : Promise<boolean> {

		if(!isValidId(id))
			throw new BadRequestError();

		let result = await this.itemRepo.deleteById(id);

		return result;

	}
}
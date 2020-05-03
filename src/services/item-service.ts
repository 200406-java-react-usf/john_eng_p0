import { Item } from '../models/item';
import { ItemRepository } from '../repos/item-repo';

export class ItemService{

	constructor(private itemRepo: ItemRepository){
		this.itemRepo = itemRepo;
	}

	async getAllItem() : Promise<Item[]>{

		let result = await this.itemRepo.getAll();

		return result;

	}
	async getItemById(id: number) : Promise<Item> {

		let result = await this.itemRepo.getById(id);

		return result;
	}

	async saveItem(newObj: Item) : Promise<Item> {
		let result = await this.itemRepo.save(newObj);
            
		return result;
	}

	async updateItem(updObj: Item) : Promise<boolean> {
		await this.itemRepo.update(updObj);
		return true;
	}

	async deleteItemById(id: number) : Promise<boolean> {

		await this.itemRepo.deleteById(id);

		return true;

	}
}
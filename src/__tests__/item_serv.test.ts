import { ItemRepository} from '../repos/item-repo';
import { ItemService } from '../services/item-service';
import { Item } from '../models/item';
import { ResourceNotFoundError, BadRequestError } from '../errors/errors';
import Validator from '../util/validator';

jest.mock('../repos/item-repo', () => {
	
	return new class ItemRepository{
		getAll = jest.fn();
		getById = jest.fn() 
		getByUniqueKey = jest.fn()
		save = jest.fn()
		update = jest.fn()
		deleteById = jest.fn()
	};
});


describe('itemService', () =>{

	let sut: ItemService;
	let mockRepo;

	let mockItems = [
		new Item(1, 'Homemade Pizza', 'Food', 1, 1),
		new Item(2, 'Twice-Baked Potatoes', 'Food', 1, 2),
		new Item(3, 'Chicken Pot Pie (easier than you think!)', 'Food', 1, 3),


	];

	beforeEach(()=> {

		mockRepo = jest.fn(() => {
			return {
				getAll: jest.fn(),
				getById: jest.fn(),
				getByUniqueKey: jest.fn(),
				save: jest.fn(),
				update: jest.fn(),
				deleteById: jest.fn()
			};
		});
		
		//@ts-ignore
		sut = new ItemService(mockRepo);

	});
	
	test('to return all items when getAllItem() is called', async () => {
	//Arrange
		expect.assertions(2);
		mockRepo.getAll = jest.fn().mockReturnValue(mockItems);
		//Act
		let result = await sut.getAllItem();
		//Assert
		expect(result).toBeTruthy();
		expect(result.length).toBe(3);
	});

	test('should reject with ResourceNotFoundError when getAllItem fails to get any item from the data source', async () => {

		// Arrange
		expect.assertions(1);
		mockRepo.getAll = jest.fn().mockReturnValue([]);

		// Act
		try {
			await sut.getAllItem();
		} catch (e) {

			// Assert
			expect(e instanceof ResourceNotFoundError).toBe(true);
		}

	});


	test('should resolve to Item when getByItemId() is given the correct id', async () => {
	//Arrange
		expect.assertions(2);
		mockRepo.getById = jest.fn().mockImplementation((id: number) => {
			return new Promise<Item>((resolve) => resolve(mockItems[id - 1]));
		});
		//Act
		let result = await sut.getItemById(1);
		//Assert
		expect(result).toBeTruthy();
		expect(result.item_id).toBe(1);
	});

	test('should reject with BadRequestError when getItemById is given a invalid value as an item_id (decimal)', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(false);

		// Act
		try {
			await sut.getItemById(3.14);
		} catch (e) {

			// Assert
			expect(e instanceof BadRequestError).toBe(true);
		}

	});

	test('should reject with BadRequestError when getItemById is given a invalid value as an item_id (zero)', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(false);

		// Act
		try {
			await sut.getItemById(0);
		} catch (e) {

			// Assert
			expect(e instanceof BadRequestError).toBe(true);
		}

	});

	test('should reject with BadRequestError when getItemById is given a invalid value as an item_id (NaN)', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(false);

		// Act
		try {
			await sut.getItemById(NaN);
		} catch (e) {

			// Assert
			expect(e instanceof BadRequestError).toBe(true);
		}

	});

	test('should reject with BadRequestError when getItemById is given a invalid value as an item_id (negative)', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(false);

		// Act
		try {
			await sut.getItemById(-2);
		} catch (e) {

			// Assert
			expect(e instanceof BadRequestError).toBe(true);
		}

	});

	test('should reject with ResourceNotFoundError if getItemByid is given an unknown Item_id', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(true);

		// Act
		try {
			await sut.getItemById(9999);
		} catch (e) {

			// Assert
			expect(e instanceof ResourceNotFoundError).toBe(true);
		}

	});
	
	test('should resolve to Item when saveItem() is called with correct newObj', async () =>{
		//Arrange
		expect.assertions(2);
		let newObj = new Item(1, 'Homemade Pizza', 'Food', 1, 1);
		mockRepo.save = jest.fn().mockImplementation(async (newObj) => {
			return newObj;});
		//Act
		let result = await sut.saveItem(newObj);
		//Assert
		expect(result).toBeTruthy();
		expect(result.item).toEqual('Homemade Pizza');
	});


	test('should resolve to BadRequestError when saveItem() is called with incorrect newObj', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.save = jest.fn().mockReturnValue(false);
		let newObj = new Item(1, '', 'Food', 1, 1);

		// Act
		try {
			await sut.saveItem(newObj);
		} catch (e) {

			// Assert
			expect(e instanceof BadRequestError).toBe(true);
		}

	});


	test('should resolve to Item when updateItem() is called with correct newObj', async ()=>{
		//Arrange
		expect.assertions(2);
		let updObj = new Item(1, 'Homemade Pizza', 'Food', 1, 1);
		mockRepo.update = jest.fn().mockReturnValue(true);
		//Act
		let result1 = await sut.updateItem(updObj);
		//Assert
		expect(result1).toBeTruthy();
		expect(result1).toBe(true);

	});

	test('should resolve to BadRequestError when updateItem() is called with incorrect newObj', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.update = jest.fn().mockReturnValue(false);
		let updObj = new Item(1, '', 'Food', 1, 1);

		// Act
		try {
			await sut.updateItem(updObj);
		} catch (e) {

			// Assert
			expect(e instanceof BadRequestError).toBe(true);
		}

	});

	test('should delete an item when deleteById() is called', async () =>{
		//Arrange
		expect.assertions(1);
		mockRepo.deleteById = jest.fn().mockReturnValue(true);
		//Act
		let result1 = await sut.deleteItemById(2);

		//Assert
		expect(result1).toBe(true);
	});

	test('should resolve to BadRequestError when deleteById() is called with incorrect id', async () =>{
		//Arrange
		expect.assertions(1);
		mockRepo.deleteById = jest.fn().mockReturnValue(false);
		//Act
		try{
			await sut.deleteItemById(-2);
		}catch(e){
		//Assert
			expect(e instanceof BadRequestError).toBe(true);
		}
	});


});
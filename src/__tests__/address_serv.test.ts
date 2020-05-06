import { AddressService } from '../services/address-service';
import { Address } from '../models/address';
import { ResourceNotFoundError, BadRequestError } from '../errors/errors';


jest.mock('../repos/address-repo', () => {
	
	return new class AddressRepository{
		getAll = jest.fn();
		getById = jest.fn() 
		getByUniqueKey = jest.fn()
		save = jest.fn()
		update = jest.fn()
		deleteById = jest.fn()
	};
});


describe('addressService', () =>{

	let sut: AddressService;
	let mockRepo;

	let mockAddresss = [
		new Address(1, '123 Adam St.',  'New York',  'NY', '10002'),
		new Address(2, '555 Mary St.',  'Brooklyn',  'NY', '10202'),
		new Address(3, '149 Ramblewood Street',  'Carmel',  'NY', '10512')
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
		sut = new AddressService(mockRepo);

	});
	
	test('to return all addresss when getAllAddress() is called', async () => {
	//Arrange
		expect.assertions(2);
		mockRepo.getAll = jest.fn().mockReturnValue(mockAddresss);
		//Act
		let result = await sut.getAllAddress();
		//Assert
		expect(result).toBeTruthy();
		expect(result.length).toBe(3);
	});

	test('should reject with ResourceNotFoundError when getAllAddress fails to get any address from the data source', async () => {

		// Arrange
		expect.assertions(1);
		mockRepo.getAll = jest.fn().mockReturnValue([]);

		// Act
		try {
			await sut.getAllAddress();
		} catch (e) {

			// Assert
			expect(e instanceof ResourceNotFoundError).toBe(true);
		}

	});


	test('should resolve to Address when getByAddressId() is given the correct id', async () => {
	//Arrange
		expect.assertions(2);
		mockRepo.getById = jest.fn().mockImplementation((id: number) => {
			return new Promise<Address>((resolve) => resolve(mockAddresss[id - 1]));
		});
		//Act
		let result = await sut.getAddressById(1);
		//Assert
		expect(result).toBeTruthy();
		expect(result.address_id).toBe(1);
	});

	test('should reject with BadRequestError when getAddressById is given a invalid value as an address_id (decimal)', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(false);

		// Act
		try {
			await sut.getAddressById(3.14);
		} catch (e) {

			// Assert
			expect(e instanceof BadRequestError).toBe(true);
		}

	});

	test('should reject with BadRequestError when getAddressById is given a invalid value as an address_id (zero)', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(false);

		// Act
		try {
			await sut.getAddressById(0);
		} catch (e) {

			// Assert
			expect(e instanceof BadRequestError).toBe(true);
		}

	});

	test('should reject with BadRequestError when getAddressById is given a invalid value as an address_id (NaN)', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(false);

		// Act
		try {
			await sut.getAddressById(NaN);
		} catch (e) {

			// Assert
			expect(e instanceof BadRequestError).toBe(true);
		}

	});

	test('should reject with BadRequestError when getAddressById is given a invalid value as an address_id (negative)', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(false);

		// Act
		try {
			await sut.getAddressById(-2);
		} catch (e) {

			// Assert
			expect(e instanceof BadRequestError).toBe(true);
		}

	});

	test('should reject with ResourceNotFoundError if getAddressByid is given an unknown Address_id', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(true);

		// Act
		try {
			await sut.getAddressById(9999);
		} catch (e) {

			// Assert
			expect(e instanceof ResourceNotFoundError).toBe(true);
		}

	});
	
	test('should resolve to Address when saveAddress() is called with correct newObj', async () =>{
		//Arrange
		expect.assertions(2);
		let newObj = new Address(1, '123 Adam St.',  'New York',  'NY', '10002');
		mockRepo.save = jest.fn().mockImplementation(async (newObj) => {
			return newObj;});
		//Act
		let result = await sut.saveAddress(newObj);
		//Assert
		expect(result).toBeTruthy();
		expect(result.street).toEqual('123 Adam St.');
	});


	test('should resolve to BadRequestError when saveAddress() is called with incorrect newObj', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.save = jest.fn().mockReturnValue(false);
		let newObj = new Address(1, '',  'New York',  'NY', '10002');

		// Act
		try {
			await sut.saveAddress(newObj);
		} catch (e) {

			// Assert
			expect(e instanceof BadRequestError).toBe(true);
		}

	});


	test('should resolve to Address when updateAddress() is called with correct newObj', async ()=>{
		//Arrange
		expect.assertions(2);
		let updObj = new Address(1, '123 Adam St.',  'New York',  'NY', '10002');
		mockRepo.update = jest.fn().mockReturnValue(true);
		//Act
		let result1 = await sut.updateAddress(updObj);
		//Assert
		expect(result1).toBeTruthy();
		expect(result1).toBe(true);

	});

	test('should resolve to BadRequestError when updateAddress() is called with incorrect newObj', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.update = jest.fn().mockReturnValue(false);
		let updObj = new Address(1, '',  'New York',  'NY', '10002');

		// Act
		try {
			await sut.updateAddress(updObj);
		} catch (e) {

			// Assert
			expect(e instanceof BadRequestError).toBe(true);
		}

	});

	test('should delete an address when deleteById() is called', async () =>{
		//Arrange
		expect.assertions(1);
		mockRepo.deleteById = jest.fn().mockReturnValue(true);
		//Act
		let result1 = await sut.deleteAddressById(2);

		//Assert
		expect(result1).toBe(true);
	});

	test('should resolve to BadRequestError when deleteById() is called with incorrect id', async () =>{
		//Arrange
		expect.assertions(1);
		mockRepo.deleteById = jest.fn().mockReturnValue(false);
		//Act
		try{
			await sut.deleteAddressById(-2);
		}catch(e){
		//Assert
			expect(e instanceof BadRequestError).toBe(true);
		}
	});


});
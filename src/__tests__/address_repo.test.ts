import { AddressRepository } from '../repos/address-repo';
import * as mockIndex from '..';
import * as mockMapper from '../util/result-set-mapper';
import { Address } from '../models/address';

/*
	We need to mock the connectionPool exported from the main module
	of our application. At this time, we only use one exposed method
	of the pg Pool API: connect. So we will provide a mock function 
	in its place so that we can mock it in our tests.
*/

jest.mock('..', ()=>{
	return {
		connectionPool: {
			connect: jest.fn()
		}
	};
});

jest.mock('../util/result-set-mapper', () => {
	return {
		mapAddressResultSet: jest.fn()
	};
});

describe('userRepo', () => {

	let sut = new AddressRepository();
	let mockConnect = mockIndex.connectionPool.connect;

	beforeEach(() => {

		/*
			We can provide a successful retrieval as the default mock implementation
			since it is very verbose. We can provide alternative implementations for
			the query and release methods in specific tests if needed.
		*/
		(mockConnect as jest.Mock).mockClear().mockImplementation(()=> {
			return {
				query: jest.fn().mockImplementation(()=>{
					return {
						rows: [
							{
								address_id: 1,
								street: '555 Hart Street',
								city: 'Brooklyn',
								state: 'NY',
								zip: '11222'

							}
						]
				   };
			   }),
			   release: jest.fn()
		   };
	   });
		(mockMapper.mapAddressResultSet as jest.Mock).mockClear();

	});


	test('should resolve to an array of Addresss when getAll retrieves records from data source', async () => {
			
		// Arrange
		expect.hasAssertions();

		let mockAddress = new Address(1, '123 Adam St.',  'New York',  'NY', '10002');
		(mockMapper.mapAddressResultSet as jest.Mock).mockReturnValue(mockAddress);

		// Act
		let result = await sut.getAll();

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof Array).toBe(true);
		expect(result.length).toBe(1);
		expect(mockConnect).toBeCalledTimes(1);

	});

	test('should resolve to an empty array when getAll retrieves no records from data source', async () => {
		
		// Arrange
		expect.hasAssertions();
		(mockConnect as jest.Mock).mockImplementation(() => {
			return {
				query: jest.fn().mockImplementation(() => { return { rows: [] }; }), 
				release: jest.fn()
			};
		});

		// Act
		let result = await sut.getAll();

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof Array).toBe(true);
		expect(result.length).toBe(0);
		expect(mockConnect).toBeCalledTimes(1);

	});

	test('should resolve to a Address object when getById retrieves a record from data source', async () => {

		// Arrange
		expect.hasAssertions();

		let mockAddress = new Address(1, '123 Adam St.',  'New York',  'NY', '10002');
		(mockMapper.mapAddressResultSet as jest.Mock).mockReturnValue(mockAddress);

		// Act
		let result = await sut.getById(1);

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof Address).toBe(true);

	});

	test('should resolve to an empty object when getAll retrieves no records from data source', async () => {
		
		// Arrange
		expect.hasAssertions();
		(mockConnect as jest.Mock).mockImplementation(() => {
			return {
				query: jest.fn().mockImplementation(() => { return { rows: {} }; }), 
				release: jest.fn()
			};
		});

		// Act
		let result = await sut.getById(1);

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof Address).toBe(true);

	});

	test('should resolve to a Address object when getByUniqueKey retrieves a record from data source', async () => {

		// Arrange
		expect.hasAssertions();

		let mockAddress = new Address(1, '123 Adam St.',  'New York',  'NY', '10002');
		(mockMapper.mapAddressResultSet as jest.Mock).mockReturnValue(mockAddress);

		// Act
		let result = await sut.getByUniqueKey('address_id', '1');

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof Address).toBe(true);

	});

	test('should resolve to an empty object when getByUniqueKey retrieves no records from data source', async () => {
		
		// Arrange
		expect.hasAssertions();
		(mockConnect as jest.Mock).mockImplementation(() => {
			return {
				query: jest.fn().mockImplementation(() => { return { rows: {} }; }), 
				release: jest.fn()
			};
		});

		// Act
		let result = await sut.getByUniqueKey('address_id','1');

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof Address).toBe(true);

	});

	test('should resolve to a Address object when save() insert a record from data source', async () => {

		// Arrange
		expect.hasAssertions();

		let mockAddress = new Address(1, '123 Adam St.',  'New York',  'NY', '10002');
		(mockConnect as jest.Mock).mockImplementation(() => {
			return {
				query: jest.fn().mockImplementation(() => { return { rows: mockAddress }; }), 
				release: jest.fn()
			};
		});

		// Act
		let result = await sut.save(mockAddress);

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof Address).toBe(true);

	});

	test('should resolve to an empty object when save() insert no record from data source', async () => {
		
		// Arrange
		expect.hasAssertions();
		let mockAddress = new Address(1, '123 Adam St.',  'New York',  'NY', '10002');
		(mockConnect as jest.Mock).mockImplementation(() => {
			return {
				query: jest.fn().mockImplementation(() => { return { rows: {} }; }), 
				release: jest.fn()
			};
		});

		// Act
		let result = await sut.save(mockAddress);

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof Address).toBe(true);

	});

	test('should resolve to a Address object when deleteById() insert a record from data source', async () => {

		// Arrange
		expect.hasAssertions();

		(mockConnect as jest.Mock).mockImplementation(() => {
			return {
				query: jest.fn().mockImplementation(() => { return { rows: {} }; }), 
				release: jest.fn()
			};
		});

		// Act
		let result = await sut.deleteById(1);

		// Assert
		expect(result).toBeTruthy();
		expect(result).toBe(true);

	});

	test('should resolve to an empty object when deleteById() insert no record from data source', async () => {
		
		// Arrange
		expect.hasAssertions();
		let mockAddress = new Address(1, '123 Adam St.',  'New York',  'NY', '10002');
		(mockConnect as jest.Mock).mockImplementation(() => {
			return {
				query: jest.fn().mockImplementation(() => { return { rows: {} }; }), 
				release: jest.fn()
			};
		});

		// Act
		let result = await sut.deleteById(1);
		// Assert
		expect(result).toBeTruthy();
		expect(result).toBe(true);
		

	});

});
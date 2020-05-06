import { ItemRepository } from '../repos/item-repo';
import * as mockIndex from '..';
import * as mockMapper from '../util/result-set-mapper';
import { Item } from '../models/item';

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
		mapItemResultSet: jest.fn()
	};
});

describe('userRepo', () => {

	let sut = new ItemRepository();
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
								item_id: 1,
								item: 'Egg Sandwich',
								comment: 'Food',
								event_id: 1,
								member_id: 1

							}
						]
				   };
			   }),
			   release: jest.fn()
		   };
	   });
		(mockMapper.mapItemResultSet as jest.Mock).mockClear();

	});


	test('should resolve to an array of Items when getAll retrieves records from data source', async () => {
			
		// Arrange
		expect.hasAssertions();

		let mockItem = new Item(1, 'Egg Sandwich', 'Food', 1, 1);
		(mockMapper.mapItemResultSet as jest.Mock).mockReturnValue(mockItem);

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

	test('should resolve to a Item object when getById retrieves a record from data source', async () => {

		// Arrange
		expect.hasAssertions();

		let mockItem = new Item(1, 'Egg Sandwich', 'Food', 1, 1);
		(mockMapper.mapItemResultSet as jest.Mock).mockReturnValue(mockItem);

		// Act
		let result = await sut.getById(1);

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof Item).toBe(true);

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
		expect(result instanceof Item).toBe(true);

	});

	test('should resolve to a Item object when getByUniqueKey retrieves a record from data source', async () => {

		// Arrange
		expect.hasAssertions();

		let mockItem = new Item(1, 'Egg Sandwich', 'Food', 1, 1);
		(mockMapper.mapItemResultSet as jest.Mock).mockReturnValue(mockItem);

		// Act
		let result = await sut.getByUniqueKey('item_id', '1');

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof Item).toBe(true);

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
		let result = await sut.getByUniqueKey('item_id','1');

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof Item).toBe(true);

	});

	test('should resolve to a Item object when save() insert a record from data source', async () => {

		// Arrange
		expect.hasAssertions();

		let mockItem = new Item(1, 'Egg Sandwich', 'Food', 1, 1);
		(mockConnect as jest.Mock).mockImplementation(() => {
			return {
				query: jest.fn().mockImplementation(() => { return { rows: mockItem }; }), 
				release: jest.fn()
			};
		});

		// Act
		let result = await sut.save(mockItem);

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof Item).toBe(true);

	});

	test('should resolve to an empty object when save() insert no record from data source', async () => {
		
		// Arrange
		expect.hasAssertions();
		let mockItem = new Item(1, 'Egg Sandwich', 'Food', 1, 1);
		(mockConnect as jest.Mock).mockImplementation(() => {
			return {
				query: jest.fn().mockImplementation(() => { return { rows: {} }; }), 
				release: jest.fn()
			};
		});

		// Act
		let result = await sut.save(mockItem);

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof Item).toBe(true);

	});

	test('should resolve to a Item object when deleteById() insert a record from data source', async () => {

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
		let mockItem = new Item(1, 'Egg Sandwich', 'Food', 1, 1);
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
import { EventMemberRepository } from '../repos/eventMember-repo';
import * as mockIndex from '..';
import * as mockMapper from '../util/result-set-mapper';
import { EventMember } from '../models/eventMember';

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
		mapEventMemberResultSet: jest.fn()
	};
});

describe('eventMemberRepo', () => {

	let sut = new EventMemberRepository();
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
								event_id: 1,
								member_id: 1
							}
						]
				   };
			   }),
			   release: jest.fn()
		   };
	   });
		(mockMapper.mapEventMemberResultSet as jest.Mock).mockClear();

	});


	test('should resolve to an array of EventMembers when getAll retrieves records from data source', async () => {
			
		// Arrange
		expect.hasAssertions();

		let mockEventMember = new EventMember(1,1);
		(mockMapper.mapEventMemberResultSet as jest.Mock).mockReturnValue(mockEventMember);

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

	test('should resolve to a EventMember object when getById retrieves a record from data source', async () => {

		// Arrange
		expect.hasAssertions();

		let mockEventMember = new EventMember(1, 1);
		(mockMapper.mapEventMemberResultSet as jest.Mock).mockReturnValue(mockEventMember);

		// Act
		let result = await sut.getById(1);

		// Assert
		expect(result).toBeTruthy();
		expect(result[0] instanceof EventMember).toBe(true); // is result an EventMember

	});

	test('should resolve to an empty object when getAll retrieves no records from data source', async () => {
		
		// Arrange
		expect.hasAssertions();
		(mockConnect as jest.Mock).mockImplementation(() => {
			return {
				query: jest.fn().mockImplementation(() => { return { rows: [] }; }), 
				release: jest.fn()
			};
		});

		// Act
		let result = await sut.getById(1);
		
		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof Array).toBe(true);
		expect(result.length).toBe(0);
		expect(mockConnect).toBeCalledTimes(1);

	});

	test('should resolve to a EventMember object when getByUniqueKey retrieves a record from data source', async () => {

		// Arrange
		expect.hasAssertions();

		let mockEventMember = new EventMember(1, 1);
		(mockMapper.mapEventMemberResultSet as jest.Mock).mockReturnValue(mockEventMember);

		// Act
		let result = await sut.getByUniqueKey('eventMember_id', '1');

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof EventMember).toBe(true);

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
		let result = await sut.getByUniqueKey('eventMember_id','1');

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof EventMember).toBe(true);

	});

	test('should resolve to a EventMember object when save() insert a record from data source', async () => {

		// Arrange
		expect.hasAssertions();

		let mockEventMember = new EventMember(1, 1);
		(mockConnect as jest.Mock).mockImplementation(() => {
			return {
				query: jest.fn().mockImplementation(() => { return { rows: mockEventMember }; }), 
				release: jest.fn()
			};
		});

		// Act
		let result = await sut.save(mockEventMember);

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof EventMember).toBe(true);

	});

	test('should resolve to an empty object when save() insert no record from data source', async () => {
		
		// Arrange
		expect.hasAssertions();
		let mockEventMember = new EventMember(1, 1);
		(mockConnect as jest.Mock).mockImplementation(() => {
			return {
				query: jest.fn().mockImplementation(() => { return { rows: {} }; }), 
				release: jest.fn()
			};
		});

		// Act
		let result = await sut.save(mockEventMember);

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof EventMember).toBe(true);

	});

	test('should resolve to a EventMember object when deleteById() insert a record from data source', async () => {

		// Arrange
		expect.hasAssertions();

		(mockConnect as jest.Mock).mockImplementation(() => {
			return {
				query: jest.fn().mockImplementation(() => { return { rows: {} }; }), 
				release: jest.fn()
			};
		});

		// Act
		let result = await sut.deleteById(1, 1);

		// Assert
		expect(result).toBeTruthy();
		expect(result).toBe(true);

	});

	test('should resolve to an empty object when deleteById() insert no record from data source', async () => {
		
		// Arrange
		expect.hasAssertions();
		let mockEventMember = new EventMember(1, 1);
		(mockConnect as jest.Mock).mockImplementation(() => {
			return {
				query: jest.fn().mockImplementation(() => { return { rows: {} }; }), 
				release: jest.fn()
			};
		});

		// Act
		let result = await sut.deleteById(1, 1);
		// Assert
		expect(result).toBeTruthy();
		expect(result).toBe(true);
		

	});
























});
import { MemberRepository } from '../repos/member-repo';
import * as mockIndex from '..';
import * as mockMapper from '../util/result-set-mapper';
import { Member } from '../models/member';

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
		mapMemberResultSet: jest.fn()
	};
});

describe('userRepo', () => {

	let sut = new MemberRepository();
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
								member_id: 1,
								username: 'john1eng',
								password: 'password',
								first_name: 'John',
								last_name: 'Eng',
								biography: 'Hello, I enjoy going out for walks.',
								email: 'john123@gmail.com',
								telephone: '(555) 555-5555',
								role: 'Admin'
							}
						]
					};
				}),
				release: jest.fn()
			};
		});
		(mockMapper.mapMemberResultSet as jest.Mock).mockClear();

	});


	test('should resolve to an array of Members when getAll retrieves records from data source', async () => {
			
		// Arrange
		expect.hasAssertions();

		let mockMember = new Member(1, 'john1eng','password','John', 'Eng', 'I like to go for walks', 'john9345@gmail.com', '(718) 444-7598)','Admin');
		(mockMapper.mapMemberResultSet as jest.Mock).mockReturnValue(mockMember);

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

	test('should resolve to a Member object when getById retrieves a record from data source', async () => {

		// Arrange
		expect.hasAssertions();

		let mockMember = new Member(1, 'john1eng','password','John', 'Eng', 'I like to go for walks', 'john9345@gmail.com', '(718) 444-7598)','Admin');
		(mockMapper.mapMemberResultSet as jest.Mock).mockReturnValue(mockMember);

		// Act
		let result = await sut.getById(1);

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof Member).toBe(true);

	});

	test('should resolve to an empty object when getById retrieves no records from data source', async () => {
		
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
		expect(result instanceof Member).toBe(true);

	});

	test('should resolve to a Member object when getByUniqueKey retrieves a record from data source', async () => {

		// Arrange
		expect.hasAssertions();

		let mockMember = new Member(1, 'john1eng','password','John', 'Eng', 'I like to go for walks', 'john9345@gmail.com', '(718) 444-7598)','Admin');
		(mockMapper.mapMemberResultSet as jest.Mock).mockReturnValue(mockMember);

		// Act
		let result = await sut.getByUniqueKey('member_id', '1');

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof Member).toBe(true);

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
		let result = await sut.getByUniqueKey('member_id','1');

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof Member).toBe(true);

	});

	test('should resolve to a Member object when save() insert a record from data source', async () => {

		// Arrange
		expect.hasAssertions();

		let mockMember = new Member(1, 'john1eng','password','John', 'Eng', 'I like to go for walks', 'john9345@gmail.com', '(718) 444-7598)','Admin');
		(mockConnect as jest.Mock).mockImplementation(() => {
			return {
				query: jest.fn().mockImplementation(() => { return { rows: mockMember }; }), 
				release: jest.fn()
			};
		});

		// Act
		let result = await sut.save(mockMember);

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof Member).toBe(true);

	});

	test('should resolve to an empty object when save() insert no record from data source', async () => {
		
		// Arrange
		expect.hasAssertions();
		let mockMember = new Member(1, 'john1eng','password','John', 'Eng', 'I like to go for walks', 'john9345@gmail.com', '(718) 444-7598)','Admin');
		(mockConnect as jest.Mock).mockImplementation(() => {
			return {
				query: jest.fn().mockImplementation(() => { return { rows: {} }; }), 
				release: jest.fn()
			};
		});

		// Act
		let result = await sut.save(mockMember);

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof Member).toBe(true);

	});

	test('should resolve to a Member object when deleteById() insert a record from data source', async () => {

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
		let mockMember = new Member(1, 'john1eng','password','John', 'Eng', 'I like to go for walks', 'john9345@gmail.com', '(718) 444-7598)','Admin');
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

	test('should resolve to a Member object when getMemberByCredentials retrieves a record from data source', async () => {

		// Arrange
		expect.hasAssertions();

		let mockMember = new Member(1, '1eng','password','John', 'Eng', 'I like to go for walks', 'john9345@gmail.com', '(718) 444-7598)','Admin');
		(mockMapper.mapMemberResultSet as jest.Mock).mockReturnValue(mockMember);

		// Act
		let result = await sut.getMemberByCredentials('john1eng','password');

		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof Member).toBe(true);

	});

	test('should resolve to an empty object when getMemberByCredentials retrieves no records from data source', async () => {
		
		// Arrange
		expect.hasAssertions();
		(mockConnect as jest.Mock).mockImplementation(() => {
			return {
				query: jest.fn().mockImplementation(() => { return { rows: {} }; }), 
				release: jest.fn()
			};
		});

		// Act
		let result = await sut.getMemberByCredentials('','password');
		console.log('---------');
		console.log(result);
		// Assert
		expect(result).toBeTruthy();
		expect(result instanceof Member).toBe(true);

	});


});
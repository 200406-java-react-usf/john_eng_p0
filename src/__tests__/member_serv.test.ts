import { MemberService } from '../services/member-service';
import { Member } from '../models/member';
import { ResourceNotFoundError, BadRequestError } from '../errors/errors';

jest.mock('../repos/member-repo', () => {
	
	return new class MemberRepository{
		getAll = jest.fn();
		getById = jest.fn() 
		getByUniqueKey = jest.fn()
		save = jest.fn()
		update = jest.fn()
		deleteById = jest.fn()
		getMemberByCredentials = jest.fn()
	};
});


describe('memberService', () =>{

	let sut: MemberService;
	let mockRepo;

	let mockMembers = [
		new Member(1, 'john1eng','password','John', 'Eng', 'I like to go for walks', 'john9345@gmail.com', '(718) 444-7598)','Admin'),
		new Member(2, 'joel1Bell','password','Joel', 'Bell', 'I enjoy cooking', 'joel345@gmail.com', '(718) 542-3333)','Admin'),
		new Member(3, 'Chris1Dolye','password','Christopher', 'Doyle', 'Hey, nice to meet you guys', 'christopher924@gmail.com',  '(718) 444-8256)','Admin')


	];

	beforeEach(()=> {

		mockRepo = jest.fn(() => {
			return {
				getAll: jest.fn(),
				getById: jest.fn(),
				getByUniqueKey: jest.fn(),
				save: jest.fn(),
				update: jest.fn(),
				deleteById: jest.fn(),
				getMemberByCredentials: jest.fn()
			};
		});
		
		//@ts-ignore
		sut = new MemberService(mockRepo);

	});
	
	test('to return all members when getAllMember() is called', async () => {
	//Arrange
		expect.assertions(2);
		mockRepo.getAll = jest.fn().mockReturnValue(mockMembers);
		//Act
		let result = await sut.getAllMember();
		//Assert
		expect(result).toBeTruthy();
		expect(result.length).toBe(3);
	});

	test('should reject with ResourceNotFoundError when getAllMember fails to get any member from the data source', async () => {

		// Arrange
		expect.assertions(1);
		mockRepo.getAll = jest.fn().mockReturnValue([]);

		// Act
		try {
			await sut.getAllMember();
		} catch (e) {

			// Assert
			expect(e instanceof ResourceNotFoundError).toBe(true);
		}

	});


	test('should resolve to Member when getByMemberId() is given the correct id', async () => {
	//Arrange
		expect.assertions(2);
		mockRepo.getById = jest.fn().mockImplementation((id: number) => {
			return new Promise<Member>((resolve) => resolve(mockMembers[id - 1]));
		});
		//Act
		let result = await sut.getMemberById(1);
		//Assert
		expect(result).toBeTruthy();
		expect(result.member_id).toBe(1);
	});

	test('should reject with BadRequestError when getMemberById is given a invalid value as an member_id (decimal)', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(false);

		// Act
		try {
			await sut.getMemberById(3.14);
		} catch (e) {

			// Assert
			expect(e instanceof BadRequestError).toBe(true);
		}

	});

	test('should reject with BadRequestError when getMemberById is given a invalid value as an member_id (zero)', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(false);

		// Act
		try {
			await sut.getMemberById(0);
		} catch (e) {

			// Assert
			expect(e instanceof BadRequestError).toBe(true);
		}

	});

	test('should reject with BadRequestError when getMemberById is given a invalid value as an member_id (NaN)', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(false);

		// Act
		try {
			await sut.getMemberById(NaN);
		} catch (e) {

			// Assert
			expect(e instanceof BadRequestError).toBe(true);
		}

	});

	test('should reject with BadRequestError when getMemberById is given a invalid value as an member_id (negative)', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(false);

		// Act
		try {
			await sut.getMemberById(-2);
		} catch (e) {

			// Assert
			expect(e instanceof BadRequestError).toBe(true);
		}

	});

	test('should reject with ResourceNotFoundError if getMemberByid is given an unknown Member_id', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(true);

		// Act
		try {
			await sut.getMemberById(9999);
		} catch (e) {

			// Assert
			expect(e instanceof ResourceNotFoundError).toBe(true);
		}

	});
	
	test('should resolve to Member when saveMember() is called with correct newObj', async () =>{
		//Arrange
		expect.assertions(2);
		let newObj = new Member(1, 'john1eng','password','John', 'Eng', 'I like to go for walks', 'john9345@gmail.com', '(718) 444-7598)','Admin');
		mockRepo.save = jest.fn().mockImplementation(async (newObj) => {
			return newObj;});
		//Act
		let result = await sut.saveMember(newObj);
		//Assert
		expect(result).toBeTruthy();
		expect(result.first_name).toEqual('John');
	});


	test('should resolve to BadRequestError when saveMember() is called with incorrect newObj', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.save = jest.fn().mockReturnValue(false);
		let newObj = new Member(1, '','password','John', 'Eng', 'I like to go for walks', 'john9345@gmail.com', '(718) 444-7598)','Admin');

		// Act
		try {
			await sut.saveMember(newObj);
		} catch (e) {

			// Assert
			expect(e instanceof BadRequestError).toBe(true);
		}

	});


	test('should resolve to Member when updateMember() is called with correct newObj', async ()=>{
		//Arrange
		expect.assertions(2);
		let updObj = new Member(1, 'john1eng','password','John', 'Eng', 'I like to go for walks', 'john9345@gmail.com', '(718) 444-7598)','Admin');
		mockRepo.update = jest.fn().mockReturnValue(true);
		//Act
		let result1 = await sut.updateMember(updObj);
		//Assert
		expect(result1).toBeTruthy();
		expect(result1).toBe(true);

	});

	test('should resolve to BadRequestError when updateMember() is called with incorrect newObj', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.update = jest.fn().mockReturnValue(false);
		let updObj = new Member(1, 'john1eng','','John', 'Eng', 'I like to go for walks', 'john9345@gmail.com', '(718) 444-7598)','Admin');

		// Act
		try {
			await sut.updateMember(updObj);
		} catch (e) {

			// Assert
			expect(e instanceof BadRequestError).toBe(true);
		}

	});

	test('should delete an member when deleteById() is called', async () =>{
		//Arrange
		expect.assertions(1);
		mockRepo.deleteById = jest.fn().mockReturnValue(true);
		//Act
		let result1 = await sut.deleteMemberById(2);

		//Assert
		expect(result1).toBe(true);
	});

	test('should resolve to BadRequestError when deleteById() is called with incorrect id', async () =>{
		//Arrange
		expect.assertions(1);
		mockRepo.deleteById = jest.fn().mockReturnValue(false);
		//Act
		try{
			await sut.deleteMemberById(-2);
		}catch(e){
		//Assert
			expect(e instanceof BadRequestError).toBe(true);
		}
	});

	test('should resolve to Member when authenticateMember() is call with correct un and pw', async () =>{
		//Arrange
		expect.assertions(1);
		mockRepo.getMemberByCredentials = jest.fn().mockImplementation((un: string, pw: string) => {
			return new Promise<Member>((resolve) => resolve(mockMembers[0]));
		});
		//Act
		let result = await sut.authenticateMember('john1eng','password');
		//Assert
		expect(result.username).toEqual('john1eng');

	});
	test('should resolve to BadRequestError when authenticateMember() is call with incorrect un and pw', async () =>{
		//Arrange
		expect.assertions(1);
		mockRepo.getMemberByCredentials = jest.fn().mockReturnValue(false);

		try{
		//Act
			await sut.authenticateMember('','password');
		//Assert
		}catch(e){
			expect(e instanceof BadRequestError).toBe(true);
		}
	});

});
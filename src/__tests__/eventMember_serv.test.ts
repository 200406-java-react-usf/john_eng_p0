import { EventMemberService } from '../services/eventMember-service';
import { EventMember } from '../models/eventMember';
import { ResourceNotFoundError, BadRequestError } from '../errors/errors';

jest.mock('../repos/eventMember-repo', () => {
	
	return new class EventMemberRepository{
		getAll = jest.fn();
		getById = jest.fn() 
		getByUniqueKey = jest.fn()
		save = jest.fn()
		update = jest.fn()
		deleteById = jest.fn()
	};
});


describe('eventMemberService', () =>{

	let sut: EventMemberService;
	let mockRepo;

	let mockEventMembers = [
		new EventMember(1, 1),
		new EventMember(1, 2),
		new EventMember(1, 3)


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
		sut = new EventMemberService(mockRepo);

	});
	
	test('to return all eventMembers when getAllEventMember() is called', async () => {
	//Arrange
		expect.assertions(2);
		mockRepo.getAll = jest.fn().mockReturnValue(mockEventMembers);
		//Act
		let result = await sut.getAllEventMember();
		//Assert
		expect(result).toBeTruthy();
		expect(result.length).toBe(3);
	});

	test('should reject with ResourceNotFoundError when getAllEventMember fails to get any eventMember from the data source', async () => {

		// Arrange
		expect.assertions(1);
		mockRepo.getAll = jest.fn().mockReturnValue([]);

		// Act
		try {
			await sut.getAllEventMember();
		} catch (e) {

			// Assert
			expect(e instanceof ResourceNotFoundError).toBe(true);
		}

	});


	test('should resolve to EventMember when getByEventMemberId() is given the correct id', async () => {
	//Arrange
		expect.assertions(2);
		mockRepo.getById = jest.fn().mockImplementation((id: number) => {
			return new Promise<EventMember>((resolve) => resolve(mockEventMembers[id - 1]));
		});
		//Act
		let result = await sut.getEventMemberById(1);
		//Assert
		expect(result).toBeTruthy();
		console.log('-------------',result);
		expect(result[0].event_id).toBe(1); // should get eventMember[], but for some reason couldn't access event_id
	});

	test('should reject with BadRequestError when getEventMemberById is given a invalid value as an eventMember_id (decimal)', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(false);

		// Act
		try {
			await sut.getEventMemberById(3.14);
		} catch (e) {

			// Assert
			expect(e instanceof BadRequestError).toBe(true);
		}

	});

	test('should reject with BadRequestError when getEventMemberById is given a invalid value as an eventMember_id (zero)', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(false);

		// Act
		try {
			await sut.getEventMemberById(0);
		} catch (e) {

			// Assert
			expect(e instanceof BadRequestError).toBe(true);
		}

	});

	test('should reject with BadRequestError when getEventMemberById is given a invalid value as an eventMember_id (NaN)', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(false);

		// Act
		try {
			await sut.getEventMemberById(NaN);
		} catch (e) {

			// Assert
			expect(e instanceof BadRequestError).toBe(true);
		}

	});

	test('should reject with BadRequestError when getEventMemberById is given a invalid value as an eventMember_id (negative)', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(false);

		// Act
		try {
			await sut.getEventMemberById(-2);
		} catch (e) {

			// Assert
			expect(e instanceof BadRequestError).toBe(true);
		}

	});

	test('should reject with ResourceNotFoundError if getEventMemberByid is given an unknown EventMember_id', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(true);

		// Act
		try {
			await sut.getEventMemberById(9999);
		} catch (e) {

			// Assert
			expect(e instanceof ResourceNotFoundError).toBe(true);
		}

	});
	
	test('should resolve to EventMember when saveEventMember() is called with correct newObj', async () =>{
		//Arrange
		expect.assertions(2);
		let newObj = new EventMember(1, 1);
		mockRepo.save = jest.fn().mockImplementation(async (newObj) => {
			return newObj;});
		//Act
		let result = await sut.saveEventMember(newObj);
		//Assert
		expect(result).toBeTruthy();
		expect(result.event_id).toBe(1);
	});


	test('should resolve to BadRequestError when saveEventMember() is called with incorrect newObj', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.save = jest.fn().mockReturnValue(false);
		let newObj = new EventMember(0, 1);

		// Act
		try {
			await sut.saveEventMember(newObj);
		} catch (e) {

			// Assert
			expect(e instanceof BadRequestError).toBe(true);
		}

	});

	test('should delete an eventMember when deleteById() is called', async () =>{
		//Arrange
		expect.assertions(1);
		mockRepo.deleteById = jest.fn().mockReturnValue(true);
		//Act
		let result1 = await sut.deleteEventMemberById(1,1);

		//Assert
		expect(result1).toBe(true);
	});

	test('should resolve to BadRequestError when deleteById() is called with incorrect id', async () =>{
		//Arrange
		expect.assertions(1);
		mockRepo.deleteById = jest.fn().mockReturnValue(false);
		//Act
		try{
			await sut.deleteEventMemberById(-2, 1);
		}catch(e){
		//Assert
			expect(e instanceof BadRequestError).toBe(true);
		}
	});


});
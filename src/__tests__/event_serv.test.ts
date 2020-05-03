import { EventRepository} from '../repos/event-repo';
import { EventService } from '../services/event-service';
import { Event } from '../models/event';

jest.mock('../repos/event-repo', () => {
	
	return new class EventRepository{
		getAll = jest.fn();
		getById = jest.fn() 
		getByUniqueKey = jest.fn()
		save = jest.fn()
		update = jest.fn()
		deleteById = jest.fn()
	}
});

describe('eventService', () =>{

	let sut: EventService;
	let mockRepo;

	let mockEvents = [
		new Event(1, 'Harr\'s Birthday Party', new Date(), new Date(), 'Looking forward to see you all', 1, 1),
		new Event(2, 'Christmas Pary', new Date(), new Date(), 'Bring a present.  We are doing secret santa.', 2, 2),
		new Event(3, 'Happy Halloween Party', new Date(), new Date(), 'Don\'t forget your Custome', 1, 3)

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
            }
		});
		
		//@ts-ignore
		sut = new EventService(mockRepo);

	});
	
	test('to return all events when getAll() is called', async () => {
	//Arrange
		expect.assertions(2);
		mockRepo.getAll = jest.fn().mockReturnValue(mockEvents);
		//Act
		let result = await sut.getAllEvent();
		//Assert
		expect(result).toBeTruthy();
		expect(result[0].event_id).toBe(1);
	});

	test('to return an event when getByEventId() is called', async () => {
	//Arrange
		expect.assertions(2);
		mockRepo.getById = jest.fn().mockReturnValue(mockEvents);
		//Act
		let result = await sut.getEventById(1);
		expect(result).toBeTruthy();
		expect(result[0].event_id).toBe(1);
	});
	
	test('to add new event when saveEvent() is called', async () =>{
		//Arrange
		expect.assertions(2);
		let newObj = new Event(1, 'Happy Halloween Party', new Date(), new Date(), 'Don\'t forget your Custome', 1, 3);
		mockRepo.save = jest.fn().mockReturnValue(newObj);
	
		//Act
		let result = await sut.saveEvent(newObj);
		//Assert
		expect(result).toBeTruthy();
		expect(result.title).toEqual('Happy Halloween Party');
	});
	test('to update an event when updateEvent() is called', async ()=>{
		//Arrange
		expect.assertions(2);
		let updObj = new Event(1, 'Happ Halloween Party', new Date(), new Date(), 'Don\'t forget your Custome', 1, 3);
		mockRepo.update = jest.fn().mockReturnValue(true);
		//Act
		let result1 = await sut.updateEvent(updObj);
		//Assert
		expect(result1).toBeTruthy();
		expect(result1).toBe(true);

	});
	test('to delete an event when deleteById() is called', async () =>{
		//Arrange
		expect.assertions(1);
		mockRepo.deleteById = jest.fn().mockReturnValue(true);
		//Act
		let result1 = sut.deleteEventById(2);

		//Assert
		expect(result1).toBe(true); //I hdont have any idea why this is failing
	});
});
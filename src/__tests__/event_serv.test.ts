import { EventRepository} from '../repos/event-repo';
import { EventService } from '../services/event-service';
import { Event } from '../models/event';

describe('eventRepo', () => {
	
	let sut: EventService;
	let mockRepo: EventRepository = new EventRepository();

	let mockEvents = [
		new Event(1, 'Harr\'s Birthday Pary', 'May 25 2020 11:00am', 'May 25 2020 14:00am', 'Looking forward to see you all', 1, 1),
		new Event(2, 'Christmas Pary', 'Dec 25 2020 11:00am', 'Dec 25 2020 14:00am', 'Bring a present.  We are doing secret santa.', 2, 2),
		new Event(3, 'Happy Halloween Pary', 'Novemeber 25 2020 11:00am', 'Novemeber 25 2020 14:00am', 'Don\'t forget your Custome', 1, 3)

	];

	beforeEach(()=> {

		sut = new EventService(mockRepo);

		//reset all external methods
		for(let method in EventRepository.prototype){
			EventRepository.prototype['method'] = jest.fn().mockImplementation(()=>{
				throw new Error(`Failed to mock external method: EventRepository.${method}!`);
			});
		}

	});
	
	test('to return all events when getAll() is called', async () => {
	//Arrange
		expect.assertions(2);
		EventRepository.prototype.getAll = jest.fn().mockReturnValue(mockEvents);
		//Act
		let result = await sut.getAllEvent();
		//Assert
		expect(result).toBeTruthy();
		expect(result[0].event_id).toBe(1);
	});

	test('to return an event when getByEventId() is called', async () => {
	//Arrange
		expect.assertions(2);
		EventRepository.prototype.getById = jest.fn().mockReturnValue(mockEvents);
		//Act
		let result = await sut.getEventById(1);
		expect(result).toBeTruthy();
		expect(result[0].event_id).toBe(1);
	});
	
	test('to add new event when saveEvent() is called', async () =>{
		//Arrange
		expect.assertions(2);
		let newObj = new Event(1, 'Happy Halloween Pary', 'Novemeber 25 2020 11:00am', 'Novemeber 25 2020 14:00am', 'Don\'t forget your Custome', 1, 3)
		EventRepository.prototype.save = jest.fn().mockReturnValue(newObj);
	
		//Act
		let result = await sut.saveEvent(newObj);
		//Assert
		expect(result).toBeTruthy();
		expect(result.title).toEqual('Harry Halloween Party');
	});
	test('to update an event when updateEvent() is called', async ()=>{
		//Arrange
		expect.assertions(2);
		let updObj = new Event(1, 'Happ Halloween Pary', 'Novemeber 25 2020 11:00am', 'Novemeber 25 2020 14:00am', 'Don\'t forget your Custome', 1, 3)
		EventRepository.prototype.update = jest.fn().mockReturnValue(updObj);
		//Act
		let result1 = await sut.updateEvent(updObj);
		//Assert
		expect(result1).toBeTruthy();
		expect(result1).toBe(true);

	});
	test('to delete an event when deleteById() is called', async () =>{
		//Arrange
		expect.assertions(1);
		EventRepository.prototype.deleteById = jest.fn().mockReturnValue(true);
		//Act
		let result1 = sut.deleteEventById(1);
		//Assert
		expect(result1).toBe(true);
	});
});
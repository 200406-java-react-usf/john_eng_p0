import { EventRepository} from '../repos/event-repo';
import { EventService } from '../services/event-service';
import { Event } from '../models/event';

describe('eventRepo', () => {
	
	let sut: EventService;
	let mockRepo: EventRepository = new EventRepository();

	let mockEvents = [
		new Event(1, 'Berry\'s Birthday Party', '134 Smith St.', new Date(), new Date(), new Date(), 'Bring a gifts', 1)

	]

	beforeEach(()=> {

		sut = new EventService(mockRepo);

		//reset all external methods
		for(let method in EventRepository.prototype){
			EventRepository.prototype['method'] = jest.fn().mockImplementation(()=>{
				throw new Error(`Failed to mock external method: EventRepository.${method}!`);
			});
		}

	})
	
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

	test('to return an event when getById() is called', async () => {
	//Arrange
		expect.assertions(2);
		EventRepository.prototype.getById = jest.fn().mockReturnValue(mockEvents);
		//Act
		let result = await sut.getEventById(1);
		expect(result).toBeTruthy();
		expect(result[0].event_id).toBe(1);
	});
	
	test('to add new event when save() is called', async () =>{
		//Arrange
		expect.assertions(2);
		let newObj = new Event(1, 'Harry\'s Birthday Party', '123 William Street', new Date(), new Date(), new Date(), 'Have fun', 1);
		EventRepository.prototype.save = jest.fn().mockReturnValue(newObj);
	
		//Act
		let result = await sut.saveEvent(newObj);
		//Assert
		expect(result).toBeTruthy();
		expect(result.location).toEqual('123 William Street');
	});
	test('to update an event when update() is called', async ()=>{
		//Arrange
		expect.assertions(2);
		let updObj = new Event(1, 'Harry\'s Birthday Party', '555 William Street', new Date(), new Date(), new Date(), 'Have fun', 1);
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
		EventRepository.prototype.deleteById = jest.fn().mockReturnValue(mockEvents);
		//Act
		let result1 = sut.deleteEventById(1);
		let result2 = sut.getEventById(1);
		//Assert
		expect(result1).toBe(true);
		expect(result2).toEqual('doesn\'t exist');
	});
});
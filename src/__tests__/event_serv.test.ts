import { EventRepository} from '../repos/event-repo';
import { EventService } from '../services/event-service';
import { Event } from '../models/event';
import { ResourceNotFoundError, BadRequestError } from '../errors/errors';
import Validator from '../util/validator';

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
	
	test('to return all events when getAllEvent() is called', async () => {
	//Arrange
		expect.assertions(2);
		mockRepo.getAll = jest.fn().mockReturnValue(mockEvents);
		//Act
		let result = await sut.getAllEvent();
		//Assert
		expect(result).toBeTruthy();
		expect(result.length).toBe(3);
	});

	test('should reject with ResourceNotFoundError when getAllEvent fails to get any event from the data source', async () => {

        // Arrange
        expect.assertions(1);
        mockRepo.getAll = jest.fn().mockReturnValue([]);

        // Act
        try {
            await sut.getAllEvent();
        } catch (e) {

            // Assert
            expect(e instanceof ResourceNotFoundError).toBe(true);
        }

    });


	test('should resolve to Event when getByEventId() is given the correct id', async () => {
	//Arrange
		expect.assertions(2);
		mockRepo.getById = jest.fn().mockImplementation((id: number) => {
            return new Promise<Event>((resolve) => resolve(mockEvents[id - 1]));
        });
		//Act
		let result = await sut.getEventById(1);
		//Assert
		expect(result).toBeTruthy();
		expect(result.event_id).toBe(1);
	});

	test('should reject with BadRequestError when getEventById is given a invalid value as an event_id (decimal)', async () => {

        // Arrange
		expect.hasAssertions();
        mockRepo.getById = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getEventById(3.14);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBe(true);
        }

    });

	test('should reject with BadRequestError when getEventById is given a invalid value as an event_id (zero)', async () => {

        // Arrange
		expect.hasAssertions();
        mockRepo.getById = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getEventById(0);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBe(true);
        }

    });

	test('should reject with BadRequestError when getEventById is given a invalid value as an event_id (NaN)', async () => {

        // Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getEventById(NaN);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBe(true);
        }

    });

    test('should reject with BadRequestError when getEventById is given a invalid value as an event_id (negative)', async () => {

        // Arrange
		expect.hasAssertions();
        mockRepo.getById = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getEventById(-2);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBe(true);
        }

    });

	test('should reject with ResourceNotFoundError if getEventByid is given an unknown Event_id', async () => {

        // Arrange
		expect.hasAssertions();
		mockRepo.getById = jest.fn().mockReturnValue(true);

        // Act
        try {
            await sut.getEventById(9999);
        } catch (e) {

            // Assert
            expect(e instanceof ResourceNotFoundError).toBe(true);
        }

    });
	
	test('should resolve to Event when saveEvent() is called with correct newObj', async () =>{
		//Arrange
		expect.assertions(2);
		let newObj = new Event(1, 'Happy Halloween Party', new Date(), new Date(), 'Don\'t forget your Custome', 1, 3);
		mockRepo.save = jest.fn().mockImplementation(async (newObj) => {
            return newObj})
		//Act
		let result = await sut.saveEvent(newObj);
		//Assert
		expect(result).toBeTruthy();
		expect(result.title).toEqual('Happy Halloween Party');
	});


	test('should resolve to BadRequestError when saveEvent() is called with incorrect newObj', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.save = jest.fn().mockReturnValue(false);
		let newObj = new Event(1, '', new Date(), new Date(), 'Don\'t forget your Custome', 1, 3);

		// Act
		try {
			await sut.saveEvent(newObj);
		} catch (e) {

			// Assert
			expect(e instanceof BadRequestError).toBe(true);
		}

	});


	test('should resolve to Event when updateEvent() is called with correct newObj', async ()=>{
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

	test('should resolve to BadRequestError when updateEvent() is called with incorrect newObj', async () => {

		// Arrange
		expect.hasAssertions();
		mockRepo.update = jest.fn().mockReturnValue(false);
		let updObj = new Event(1, '', new Date(), new Date(), 'Don\'t forget your Custome', 1, 3);

		// Act
		try {
			await sut.updateEvent(updObj);
		} catch (e) {

			// Assert
			expect(e instanceof BadRequestError).toBe(true);
		}

	});

	test('should delete an event when deleteById() is called', async () =>{
		//Arrange
		expect.assertions(1);
		mockRepo.deleteById = jest.fn().mockReturnValue(true);
		//Act
		let result1 = await sut.deleteEventById(2);

		//Assert
		expect(result1).toBe(true);
	});

	test('should resolve to BadRequestError when deleteById() is called with incorrect id', async () =>{
		//Arrange
		expect.assertions(1);
		mockRepo.deleteById = jest.fn().mockReturnValue(false);
		//Act
		try{
			await sut.deleteEventById(-2);
		}catch(e){
		//Assert
		expect(e instanceof BadRequestError).toBe(true);
		}
	});


});
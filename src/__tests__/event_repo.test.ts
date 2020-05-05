import { EventRepository } from '../repos/event-repo';
import * as mockIndex from '..';
import * as mockMapper from '../util/result-set-mapper';
import { Event } from '../models/event';

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
	}
});

jest.mock('../util/result-set-mapper', () => {
	return {
		mapEventResultSet: jest.fn()
	}
})

describe('userRepo', () => {

	let sut = new EventRepository();
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
								title: 'Happy Thanksgiving',
								time_begin: new Date(),
								time_end: new Date(),
								notes: 'Welcome all.  Bring some food to share.',
								address_id: 1,
								host_id: 2

							}
						]
				   }
			   }),
			   release: jest.fn()
		   }
	   });
       (mockMapper.mapEventResultSet as jest.Mock).mockClear();

	})


	test('should resolve to an array of Events when getAll retrieves records from data source', async () => {
			
		// Arrange
		expect.hasAssertions();

		let mockEvent = new Event(1, 'title', new Date(), new Date(), 'note', 1, 1);
		(mockMapper.mapEventResultSet as jest.Mock).mockReturnValue(mockEvent);

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
                query: jest.fn().mockImplementation(() => { return { rows: [] } }), 
                release: jest.fn()
            }
        });

        // Act
        let result = await sut.getAll();

        // Assert
        expect(result).toBeTruthy();
        expect(result instanceof Array).toBe(true);
        expect(result.length).toBe(0);
        expect(mockConnect).toBeCalledTimes(1);

    });

    test('should resolve to a Event object when getById retrieves a record from data source', async () => {

        // Arrange
        expect.hasAssertions();

        let mockEvent = new Event(1, 'title', new Date(), new Date(), 'note', 1, 1);
        (mockMapper.mapEventResultSet as jest.Mock).mockReturnValue(mockEvent);

        // Act
        let result = await sut.getById(1);

        // Assert
        expect(result).toBeTruthy();
        expect(result instanceof Event).toBe(true);

    });

	test('should resolve to an empty object when getAll retrieves no records from data source', async () => {
        
        // Arrange
        expect.hasAssertions();
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => { return { rows: {} } }), 
                release: jest.fn()
            }
        });

        // Act
        let result = await sut.getById(1);

        // Assert
        expect(result).toBeTruthy();
        expect(result instanceof Event).toBe(true);

    });

    test('should resolve to a Event object when getByUniqueKey retrieves a record from data source', async () => {

        // Arrange
        expect.hasAssertions();

        let mockEvent = new Event(1, 'title', new Date(), new Date(), 'note', 1, 1);
        (mockMapper.mapEventResultSet as jest.Mock).mockReturnValue(mockEvent);

        // Act
        let result = await sut.getByUniqueKey('event_id', '1');

        // Assert
        expect(result).toBeTruthy();
        expect(result instanceof Event).toBe(true);

    });

	test('should resolve to an empty object when getByUniqueKey retrieves no records from data source', async () => {
        
        // Arrange
        expect.hasAssertions();
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => { return { rows: {} } }), 
                release: jest.fn()
            }
        });

        // Act
        let result = await sut.getByUniqueKey('event_id','1');

        // Assert
        expect(result).toBeTruthy();
        expect(result instanceof Event).toBe(true);

    });

    test('should resolve to a Event object when save() insert a record from data source', async () => {

        // Arrange
        expect.hasAssertions();

        let mockEvent = new Event(1, 'title', new Date(), new Date(), 'note', 1, 1);
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => { return { rows: mockEvent } }), 
                release: jest.fn()
            }
        });

        // Act
        let result = await sut.save(mockEvent);

        // Assert
        expect(result).toBeTruthy();
        expect(result instanceof Event).toBe(true);

    });

	test('should resolve to an empty object when save() insert no record from data source', async () => {
        
        // Arrange
		expect.hasAssertions();
		let mockEvent = new Event(1, 'title', new Date(), new Date(), 'note', 1, 1);
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => { return { rows: {} } }), 
                release: jest.fn()
            }
        });

        // Act
        let result = await sut.save(mockEvent);

        // Assert
        expect(result).toBeTruthy();
        expect(result instanceof Event).toBe(true);

    });

	test('should resolve to a Event object when deleteById() insert a record from data source', async () => {

        // Arrange
        expect.hasAssertions();

        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => { return { rows: {} } }), 
                release: jest.fn()
            }
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
		let mockEvent = new Event(1, 'title', new Date(), new Date(), 'note', 1, 1);
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => { return { rows: {} } }), 
                release: jest.fn()
            }
        });

        // Act
        let result = await sut.deleteById(1);
		console.log("---------", result)
        // Assert
        expect(result).toBeTruthy();
		expect(result).toBe(true);
		

    });
























})
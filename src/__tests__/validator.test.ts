import { isValidId, isValidStrings, isValidObject, isPropertyOf } from "../util/validator";
import { Event } from "../models/event";
import { Member } from "../models/member";
import { Address } from "../models/address";
import { Item } from "../models/item";
import { EventMember } from "../models/eventMember";

describe('validator', () => {

    test('should return true when isValidId is provided a valid id', () => {
        
        // Arrange
        expect.assertions(3);

        // Act
        let result1 = isValidId(1);
        let result2 = isValidId(999999);
        let result3 = isValidId(Number('123'));

        // Assert
        expect(result1).toBe(true);
        expect(result2).toBe(true);
        expect(result3).toBe(true);

    });

    test('should return false when isValidId is provided a invalid id (falsy)', () => {

        // Arrange
        expect.assertions(3);

        // Act
        let result1 = isValidId(NaN);
        let result2 = isValidId(0);
        let result3 = isValidId(Number(null));

        // Assert
        expect(result1).toBe(false);
        expect(result2).toBe(false);
        expect(result3).toBe(false);

    });

    test('should return false when isValidId is provided a invalid id (decimal)', () => {

        // Arrange
        expect.assertions(3);

        // Act
        let result1 = isValidId(3.14);
        let result2 = isValidId(0.01);
        let result3 = isValidId(Number(4.20));

        // Assert
        expect(result1).toBe(false);
        expect(result2).toBe(false);
        expect(result3).toBe(false);

    });

    test('should return false when isValidId is provided a invalid id (non-positive)', () => {

        // Arrange
        expect.assertions(3);

        // Act
        let result1 = isValidId(0);
        let result2 = isValidId(-1);
        let result3 = isValidId(Number(-23));

        // Assert
        expect(result1).toBe(false);
        expect(result2).toBe(false);
        expect(result3).toBe(false);

    });

    test('should return true when isValidStrings is provided valid string(s)', () => {

        // Arrange
        expect.assertions(3);

        // Act
        let result1 = isValidStrings('valid');
        let result2 = isValidStrings('valid', 'string', 'values');
        let result3 = isValidStrings(String('weird'), String('but valid'));

        // Assert
        expect(result1).toBe(true);
        expect(result2).toBe(true);
        expect(result3).toBe(true);

    });

    test('should return false when isValidStrings is provided invalid string(s)', () => {

        // Arrange
        expect.assertions(3);

        // Act
        let result1 = isValidStrings('');
        let result2 = isValidStrings('some valid', '', 'but not all');
        let result3 = isValidStrings(String(''), String('still weird'));

        // Assert
        expect(result1).toBe(false);
        expect(result2).toBe(false);
        expect(result3).toBe(false);

    });

    test('should return true when isValidObject is provided valid object with no nullable props', () => {

        // Arrange
        expect.assertions(5);

        // Act
        let result1 = isValidObject(new Event(1,'title', new Date(), new Date(), 'note', 1, 1));
        let result2 = isValidObject(new Member(1, 'first', 'last', 'i love to read', 'sdf@gmail.com', '(888)555-5555'));
        let result3 = isValidObject(new Address(1, 'street', 'city', 'state', 'zip'));
        let result4 = isValidObject(new Item(1, 'item', 'comment', 1, 1));
        let result5 = isValidObject(new EventMember(1, 1));



        // Assert
        expect(result1).toBe(true);
        expect(result2).toBe(true);
        expect(result3).toBe(true);
        expect(result4).toBe(true);
        expect(result5).toBe(true);

    });

    test('should return true when isValidObject is provided valid object with nullable prop(s)', () => {

        // Arrange
        expect.assertions(5);

        // Act
        let result1 = isValidObject(new Event(1,'title', new Date(), new Date(), 'note', 1, 1), 'event_id');
        let result2 = isValidObject(new Member(1, 'first', 'last', 'i love to read', 'sdf@gmail.com', '(888)555-5555'), 'member_id');
        let result3 = isValidObject(new Address(1, 'street', 'city', 'state', 'zip'), 'address_id');
        let result4 = isValidObject(new Item(1, 'item', 'comment', 1, 1), 'item_id');
        let result5 = isValidObject(new EventMember(1, 1), 'event_id');

        // Assert
        expect(result1).toBe(true);
        expect(result2).toBe(true);
        expect(result3).toBe(true);
        expect(result4).toBe(true);
        expect(result5).toBe(true);

    });

    test('should return false when isValidObject is provided invalid object with no nullable prop(s)', () => {

        // Arrange
        expect.assertions(5);

        // Act
        let result1 = isValidObject(new Event(1,'', new Date(), new Date(), 'note', 1, 1));
        let result2 = isValidObject(new Member(1, 'first', 'last', 'i love to read', '', '(888)555-5555'));
        let result3 = isValidObject(new Address(1, 'street', '', 'state', 'zip'));
        let result4 = isValidObject(new Item(1, 'item', 'comment', 0, 1));
        let result5 = isValidObject(new EventMember(0, 1));

        // Assert
        expect(result1).toBe(false);
        expect(result2).toBe(false);
        expect(result3).toBe(false);
        expect(result4).toBe(false);
        expect(result5).toBe(false);

    });

    test('should return false when isValidObject is provided invalid object with some nullable prop(s)', () => {

        // Arrange
        expect.assertions(5);

        // Act
        let result1 = isValidObject(new Event(1,'', new Date(), new Date(), 'note', 1, 1), 'event_id');
        let result2 = isValidObject(new Member(1, 'first', '', 'i love to read', 'sdf@gmail.com', '(888)555-5555'), 'member_id');
        let result3 = isValidObject(new Address(1, 'street', 'city', '', 'zip'), 'address_id');
        let result4 = isValidObject(new Item(1, 'item', '', 0, 1), 'item_id');
        let result5 = isValidObject(new EventMember(1, 0), 'event_id');

        // Assert
        expect(result1).toBe(false);
        expect(result2).toBe(false);
        expect(result3).toBe(false);
        expect(result4).toBe(false);
        expect(result5).toBe(false);

    });

    test('should return true when isPropertyOf is provided a known property of a given constructable type', () => {

        // Arrange
        expect.assertions(5);

        // Act
        let result1 = isPropertyOf('event_id', Event);
        let result2 = isPropertyOf('first_name', Member);
        let result3 = isPropertyOf('street', Address);
        let result4 = isPropertyOf('item', Item);
        let result5 = isPropertyOf('member_id', EventMember);

        // Assert
        expect(result1).toBe(true);
        expect(result2).toBe(true);
        expect(result3).toBe(true);
        expect(result4).toBe(true);
        expect(result5).toBe(true);

    });

    test('should return false when isPropertyOf is provided a unknown property of a given constructable type', () => {

        // Arrange
        expect.assertions(5);

        // Act
        let result1 = isPropertyOf('no_real', Event);
        let result2 = isPropertyOf('fake', Member);
        let result3 = isPropertyOf('haha', Address);
        let result4 = isPropertyOf('awefully_slow', Item);
        let result5 = isPropertyOf('pizza_pizza', EventMember);

        // Assert
        expect(result1).toBe(false);
        expect(result2).toBe(false);
        expect(result3).toBe(false);
        expect(result4).toBe(false);
        expect(result5).toBe(false);

    });

    test('should return false when isPropertyOf is provided a non-constructable type', () => {

        // Arrange
        expect.assertions(4);

        // Act
        let result1 = isPropertyOf('shouldn\'t work', {x: 'non-constructable'});
        let result2 = isPropertyOf('nope', 2);
        let result3 = isPropertyOf('nuh-uh', false);
        let result4 = isPropertyOf('won\'t work', Symbol('asd'));

        // Assert
        expect(result1).toBe(false);
        expect(result2).toBe(false);
        expect(result3).toBe(false);
        expect(result4).toBe(false);  

    });

})
import { MemberRepository} from '../repos/member-repo';
import { MemberService } from '../services/member-service';
import { Member } from '../models/member';

describe('event service', () => {
	let sut: MemberService;

	let mockRepo: MemberRepository = new MemberRepository;
    
	let mockMember: Member[] = [
		new Member(1, 'John', 'Eng', 'I like to go for walks', 'john9345@gmail.com', '(718) 444-7598)'),
		new Member(2, 'Joel', 'Bell', 'I enjoy cooking', 'joel345@gmail.com', '(718) 542-3333)'),
		new Member(3, 'Christopher', 'Doyle', 'Hey, nice to meet you guys', 'christopher924@gmail.com',  '(718) 444-8256)')
	
	];

	beforeEach(()=>{
		sut = new MemberService(mockRepo);

		//reset all external methods
		for(let method in MemberRepository.prototype){
			MemberRepository.prototype['method'] = jest.fn().mockImplementation(()=>{
				throw new Error(`Fail to mock external methods: MemberRepository ${method}!`);
			});
		}

	});
	//getAllMember
	test('to return all members when getAllMember() is passed', async ()=> {
		//Arrange
		expect.assertions(3);
		MemberRepository.prototype.getAll = jest.fn().mockReturnValue(mockMember);
		//Act
		let result : Member[] = await sut.getAllMember();

		//Assert
		expect(result).toBeTruthy();
		expect(result.length).toBe(4);
		expect(result[1].first_name).toEqual('Joel');

	});
	//getMemberByID
	test('to return member by id when getMemberById() is passed', async()=>{
		//Arrange
		expect.assertions(2);
		MemberRepository.prototype.getById = jest.fn().mockReturnValue(mockMember);
		//Act
		let result: Member = await sut.getMemberById(3);
		//Assert
		expect(result).toBeTruthy();
		expect(result.last_name).toEqual('Cruise');
	});
	//saveMember
	test('to return save member when saveMember() is passed', async()=>{
		//Arrange
		expect.assertions(2);
		let newObj = new Member(1, 'John', 'Eng', 'I like to go for walks', 'john9345@gmail.com', '(718) 444-7598)');
		MemberRepository.prototype.getById = jest.fn().mockReturnValue(newObj);
		//Act
		let result: Member = await sut.saveMember(newObj);
		//Assert
		expect(result).toBeTruthy();
		expect(result.email).toEqual('john9345@gmail.com');
	});
	//updateMember
	test('to return true when updateMember() is passed', async () =>{
		//Arrange
		expect.assertions(1);
		let updObj = new Member(1, 'ohn', 'Eng', 'I like to go for walks', 'john9345@gmail.com', '(718) 444-7598)');
		MemberRepository.prototype.update = jest.fn().mockReturnValue(updObj);
		//Act
		let result: boolean = await sut.updateMember(updObj);
		//Assert
		expect(result).toBe(true);

	});
	//deleteMemberById
	test('to return true when deleteMemberById() is passed', async () =>{
		//Arrange
		expect.assertions(1);
		//Act
		MemberRepository.prototype.update = jest.fn().mockReturnValue(true);
		let result: boolean = await sut.deleteMemberById(1);
		//Assert
		expect(result).toBe(true);
	});


});
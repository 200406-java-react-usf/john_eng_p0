import { MemberRepository} from '../repos/member-repo';
import { MemberService } from '../services/member-service';
import { Member } from '../models/member';

describe('event service', () => {
    let sut: MemberService;

    let mockRepo: MemberRepository = new MemberRepository;
    
    let mockMember: Member[] = [
        new Member(1, 'john1eng', 'password', 'John', 'Eng', "I love a game of chess", 'john1eng@hotmail.com', '(434) 555-5555)'),	
        new Member(1, 'gary1tomo', 'password', 'Gary', 'Tomo', "I love a game of chess", 'john1eng@hotmail.com', '(434) 555-5555)'),	
        new Member(1, 'berry1sander', 'password', 'Berry', 'Sander', "I love a game of chess", 'john1eng@hotmail.com', '(434) 555-5555)'),	
        new Member(1, 'tom1cruise', 'password', 'Tom', 'Cruise', "I love a game of chess", 'john1eng@hotmail.com', '(434) 555-5555)')	

    ]

    beforeEach(()=>{
        sut = new MemberService(mockRepo)

        //reset all external methods
        for(let method in MemberRepository.prototype){
            MemberRepository.prototype['method'] = jest.fn().mockImplementation(()=>{
                throw new Error(`Fail to mock external methods: MemberRepository ${method}!`);
            });
        }

    })
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
        expect(result[1].first_name).toEqual('Gary');

    })
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
    })
    //saveMember
    test('to return save member when saveMember() is passed', async()=>{
        //Arrange
        expect.assertions(2);
        let newObj = new Member(1, 'john1eng', 'password', 'John', 'Eng', "I love a game of chess", 'john1eng@hotmail.com', '(434) 555-5555)');
        MemberRepository.prototype.getById = jest.fn().mockReturnValue(newObj)
        //Act
        let result: Member = await sut.saveMember(newObj);
        //Assert
        expect(result).toBeTruthy();
        expect(result.email).toEqual('john1eng@hotmail.com');
    })
    //updateMember
    test('to return true when updateMember() is passed', async () =>{
        //Arrange
        expect.assertions(1)
        let updObj = new Member(1, 'john1eng', 'password', 'John', 'Eng', "I love a game of chess", 'john1eng@hotmail.com', '(434) 555-5555)');
        MemberRepository.prototype.update = jest.fn().mockReturnValue(updObj);
        //Act
        let result: boolean = await sut.updateMember(updObj);
        //Assert
        expect(result).toBe(true);

    })
    //deleteMemberById
    test('to return true when deleteMemberById() is passed', async () =>{
        //Arrange
        expect.assertions(1);
        //Act
        MemberRepository.prototype.update = jest.fn().mockReturnValue(true);
        let result: boolean = await sut.deleteMemberById(1);
        //Assert
        expect(result).toBe(true);
    })


})
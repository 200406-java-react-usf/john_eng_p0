import { Member } from '../models/member';
import { MemberRepository } from '../repos/member-repo';

export class MemberService{

    constructor(private memberRepo: MemberRepository){
        this.memberRepo = memberRepo;
    }

    getAllMember() : Promise<Member[]>{

        return new Promise<Member[]>(async (resolve,reject)=>{
            let members: Member[] = [];

            let result = await this.memberRepo.getAll();

            for(let member of result){
                members.push({...member});
            }

            resolve(result);


        })
    }
    getMemberById(id: number) : Promise<Member> {
        return new Promise<Member>(async (resolve, reject)=>{

            let result = await this.memberRepo.getById(id);
            console.log('result', result);
            resolve(result);
        })
    };

    saveMember(newObj: Member) : Promise<Member> {
        return new Promise<Member>(async (resolve, reject)=>{
            let result = {...await this.memberRepo.save(newObj)};
            
            resolve(result);
        })
    }

    updateMember(updObj: Member) : Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject)=>{
            await this.memberRepo.update(updObj);
            resolve(true);
        })
    }

    deleteMemberById(id: number) : Promise<boolean> {
        return new Promise<boolean>(async (resolve, rejected) => {
            await this.memberRepo.deleteById(id);

            resolve(true);

        })
    }
}
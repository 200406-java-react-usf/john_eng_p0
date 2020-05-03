export class Item{
    item_id: number;
    item: string;
    comment: string;
    event_id: number;
    member_id: number;
    
    
    constructor(item_id: number, item: string, comment: string, event_id: number, member_id: number){
        this.item_id = item_id;
        this.item = item;
        this.comment = comment;
        this.event_id = event_id;
        this.member_id = member_id;
    }
    

}
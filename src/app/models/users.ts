export class Users {
    public Id: number;
    public firstName: string;
    public pin:string;
    public lastName:string;
    
    constructor(Id:number,firstName: string,pin:string,lastName:string) {
    this.Id = Id;
    this.firstName = firstName;
    this.pin = pin;
    this.lastName = lastName;
    }
    }
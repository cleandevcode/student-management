export default class Students {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;

    constructor(id: string, firstName: string, lastName: string, email: string, mobileNumber: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.mobileNumber = mobileNumber;
    } 
}
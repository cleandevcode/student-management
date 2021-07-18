export default class Persons {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  address: string;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    mobileNumber: string,
    address: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.mobileNumber = mobileNumber;
    this.address = address;
  }
}

export default class Response {
  public status: boolean;
  public data: any;
  public message: string;

  constructor(status: boolean, data: any, message: string) {
    this.status = status;
    this.data = data;
    this.message = message;
  }
}

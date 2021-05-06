export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private tokenExpirationTime: Date
  ) {}

  get token() {
    if(!this.tokenExpirationTime || new Date() > this.tokenExpirationTime) {
      return null;
    }
    return this._token;
  }
}

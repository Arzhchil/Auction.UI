export class BetModel {
  public userid: number;
  public lotid: number;
  public betValue: number;

  constructor(userid: number, lotid: number, betValue: number) {
    this.userid = userid;
    this.lotid = lotid;
    this.betValue = betValue;
  }
}

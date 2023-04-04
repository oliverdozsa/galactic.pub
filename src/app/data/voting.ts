export class Voting {
  public id: string = "";
  public network: string = "";
  public title: string = "";
  public votesCap: number = -1;
  public polls: Poll[] = [];
  public createdAt: string = "";
  public encryptedUntil: string | undefined = undefined;
  public decryptionKey: string | undefined = undefined;
  public startDate: string = "";
  public endDate: string = "";
  public fundingAccountId: string | undefined = undefined;
  public distributionAccountId: string | undefined = undefined;
  public ballotAccountId: string | undefined = undefined;
  public issuerAccountId: string | undefined = undefined;
  public assetCode: string = "";
  public authorization: string = "";
  public visibility: string = "";
  public isOnTestNetwork: boolean = false;
  public isRefunded: boolean = false;
  public isInvitesBased: boolean = false;
  public ballotType: string = "";
  public maxChoices: number | undefined;
  public description: string | undefined = undefined;
}

export class Poll {
  public index: number = -1;
  public question: string = "";
  public description: string | undefined = undefined;
  public pollOptions: PollOption[] = [];
}

export class PollOption {
  public name: string = "";
  public code: number = -1;
}

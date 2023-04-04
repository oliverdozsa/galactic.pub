import {BallotType, CreateVotingForm, Visibility, VotingQuestion} from "../components/create-voting/create-voting-form";

export class CreateVotingRequest {
  public network: string = "";
  public votesCap: number = 0;
  public title: string = "";
  public tokenIdentifier: string | undefined = undefined;
  public encryptedUntil: string | undefined = undefined;
  public startDate: string = "";
  public endDate: string = "";
  public authorization: string = "";
  public authorizationEmailOptions: string[] | undefined = undefined;
  public polls: CreatePollRequest[] = [];
  public visibility: string = "";
  public fundingAccountPublic: string = "";
  public fundingAccountSecret: string = "";
  public useTestnet: boolean = false;
  public sendInvites: boolean = false;
  public organizer: string = "";
  public ballotType: string = "";
  public maxChoices: number | undefined;
  public description: string | undefined = undefined;

  static fromCreateVotingForm(form: CreateVotingForm): CreateVotingRequest {
    const request = new CreateVotingRequest();

    request.network = form.selectedNetwork;
    request.votesCap = form.votesCap!;
    request.title = form.title;
    request.tokenIdentifier = form.tokenIdentifier ? form.tokenIdentifier : undefined;
    request.encryptedUntil = form.isEncrypted ? form.encryptedUntil.toISOString() : undefined;
    request.startDate = form.startDate.toISOString();
    request.endDate = form.endDate.toISOString();
    request.authorization = form.authorization;
    request.authorizationEmailOptions =
      form.authorizationEmails.size > 0 ? Array.from(form.authorizationEmails) : undefined;
    request.polls = form.questions.map(q => CreatePollRequest.fromVotingQuestion(q));
    request.visibility = Visibility[form.visibility];
    request.fundingAccountPublic = form.fundingAccountPublic;
    request.fundingAccountSecret = form.fundingAccountSecret;
    request.useTestnet = form.shouldUseTestNet;
    request.sendInvites = form.isInvitesBased;
    request.organizer = form.organizerIfInvitesBased;
    request.ballotType = BallotType[form.ballotType];
    request.description = form.description;

    if (form.ballotType == BallotType.MULTI_CHOICE) {
      request.maxChoices = form.maxChoices;
    }

    return request;
  }
}


export class CreatePollRequest {
  public question: string = "";
  public description: string | undefined = undefined;
  public options: CreatePollOptionRequest[] = [];

  static fromVotingQuestion(question: VotingQuestion): CreatePollRequest {
    const request = new CreatePollRequest();

    request.question = question.question;
    request.description = question.description;
    request.options = question.options.map((o, i) => new CreatePollOptionRequest(o, i + 1));

    return request;
  }
}

export class CreatePollOptionRequest {
  public name: string = "";
  public code: number = 0;


  constructor(name: string, code: number) {
    this.name = name;
    this.code = code;
  }
}

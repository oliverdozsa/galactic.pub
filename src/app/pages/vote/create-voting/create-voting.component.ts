import {Component} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {CreateVotingForm} from "../../../create-voting/create-voting-form";
import {VotingsService} from "../../../services/votings.service";
import {ToastService} from "../../../services/toast.service";
import {AppRoutes} from "../../../app-routes";
import {Router} from "@angular/router";
import {AppAuthService} from "../../../services/app-auth.service";

export enum Step {
  Network,
  Funding,
  BasicData,
  Questions
}

@Component({
  selector: 'app-create-voting',
  templateUrl: './create-voting.component.html',
  styleUrls: ['./create-voting.component.scss']
})
export class CreateVotingComponent {
  currentStep: Step = Step.Network;
  form: CreateVotingForm = new CreateVotingForm();

  protected readonly Step = Step;

  get shouldGoToPrevStepBeDisplayed() {
    return this.currentStep != Step.Network
  }

  get shouldGoToNextStepBeDisplayed() {
    return this.currentStep != Step.Questions;
  }

  get isDisallowedToGoToNextStep(): boolean {
    if (this.currentStep == Step.Network) {
      return this.form.selectedNetwork == ""
    } else if (this.currentStep == Step.Funding) {
      return this.form.fundingAccountBalance.value < 1;
    } else if (this.currentStep == Step.BasicData) {
      return !this.form.validation.isVotesLimitValid ||
        !this.form.validation.isAuthorizationInputValid ||
        !this.form.validation.isTitleValid ||
        !this.form.validation.isEncryptedUntilValid ||
        !this.form.validation.isStartDateValid || !this.form.validation.isEndDateValid ||
        !this.form.validation.isTokenIdentifierValid ||
        !this.form.validation.isOrganizerValid ||
        !this.form.validation.isMaxChoicesValid ||
        !this.form.validation.isDescriptionValid;
    }

    return true;
  }

  get isDisallowedToCreate(): boolean {
    return !this.form.validation.areQuestionsValid;
  }

  get isLoading(): boolean {
    return this.form.isGeneratingFundingAccount || this.form.fundingAccountBalance.isLoading || this._isCreating;
  }

  private _isCreating = false;

  constructor(public appAuth: AppAuthService, private votingsService: VotingsService, private toastService: ToastService,
              private router: Router) {
  }

  onNextClicked() {
    if (this.currentStep < Step.Questions)
      this.currentStep += 1;
  }

  onPrevClicked() {
    if (this.currentStep > Step.Network) {
      this.currentStep -= 1;
    }
  }

  onCreateClicked() {
    this._isCreating = true;

    this.votingsService.create(this.form)
      .subscribe({
        next: () => this.onVotingSuccessfullyCreated(),
        error: () => this.onVotingCreationFailed()
      });
  }

  private onVotingSuccessfullyCreated() {
    this._isCreating = false;
    this.toastService.success("Voting created 👍!");
    this.router.navigate(["/" + AppRoutes.MY_VOTINGS]);
  }

  private onVotingCreationFailed() {
    this._isCreating = false;
    this.toastService.error("Failed to create voting 😟");
  }

}

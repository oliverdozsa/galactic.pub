import {Component, Input, OnInit} from '@angular/core';
import {CastVoteOrchestration} from "./cast-vote-orchestration";
import {Router} from "@angular/router";
import {AppRoutes} from "../../../../app-routes";
import {describeState, ProgressState} from 'src/app/data/progress';
import {Voting} from "../../../../data/voting";
import {CastVoteService} from "../../../../services/cast-vote.service";
import {ToastService} from "../../../../services/toast.service";
import {Subject, takeUntil} from "rxjs";
import {fadeInDownAnimation, fadeOutUpAnimation} from "angular-animations";

@Component({
  selector: 'app-cast-vote-progress',
  templateUrl: './cast-vote-progress.component.html',
  styleUrls: ['./cast-vote-progress.component.scss']
})
export class CastVoteProgressComponent {
  @Input()
  voting: Voting = new Voting();

  orchestration: CastVoteOrchestration | undefined;

  isAllowedToCastVote: boolean = false;

  get isCompleted(): boolean {
    return this.orchestration != undefined &&
      this.orchestration.isCompleted;
  }

  get isFailed(): boolean {
    return this.orchestration != undefined && this.orchestration.isFailed &&
      this.orchestration.progress.state != ProgressState.CompletelyFailed;
  }

  get isCompletelyFailed(): boolean {
    return this.orchestration != undefined && this.orchestration.progress.state == ProgressState.CompletelyFailed;
  }

  get progressPercent(): number {
    return this.orchestration == undefined ? 0 : this.orchestration.progressPercent;
  }

  get progressText(): string {
    if(this.orchestration != undefined) {
      return describeState(this.orchestration.progress.state);
    }

    return "";
  }

  private selectedOptions: any[] = [];

  private destroy$ = new Subject<void>();

  constructor(private castVoteService: CastVoteService, private toastService: ToastService, private router: Router) {
    castVoteService.selectedOptionsChange$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: o => this.selectedOptions = o
      });

    castVoteService.isAllowedToCastVoteChange$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: i => this.isAllowedToCastVote = i
      })
  }

  onCloseClick() {
    this.router.navigateByUrl(`/${AppRoutes.LETS_VOTE}`);
  }

  onRetryClick() {
    this.orchestration!.isFailed = false;
    this.orchestration!.restartCastVote();
  }

  castVote() {
    this.orchestration = new CastVoteOrchestration(this.voting, this.selectedOptions, this.castVoteService, this.toastService);
    this.orchestration.castVote();
  }
}

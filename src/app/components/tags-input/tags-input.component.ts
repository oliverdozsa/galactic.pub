import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TagsInputTag} from "./tags-input-tag";

@Component({
  selector: 'app-tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: ['./tags-input.component.scss']
})
export class TagsInputComponent {
  @Input()
  placeholder: string = "";

  @Input()
  label: string = "";

  @Input()
  inputValidation: (currentUserInput: string) => string | undefined = u => undefined;

  @Input()
  tagsValidation: (tags: TagsInputTag[]) => string | undefined = t => undefined;

  @Output()
  tagsChanged: EventEmitter<TagsInputTag[]> = new EventEmitter<TagsInputTag[]>();

  @Input()
  tags: TagsInputTag[] = []

  currentUserInput: string = "";

  get isInputValid(): boolean {
    return this.inputValidation(this.currentUserInput) == undefined;
  }

  get areTagsValid(): boolean {
    return this.tagsValidation(this.tags) == undefined;
  }

  get inputErrorMessage(): string | undefined {
    return this.inputValidation(this.currentUserInput);
  }

  get tagsErrorMessage(): string | undefined {
    return this.tagsValidation(this.tags);
  }

  currentInputToTagIfValid() {
    if(this.isInputValid && this.currentUserInput.length > 0) {
      this.tags.push({text: this.currentUserInput});
      this.tagsChanged.emit(this.deepCopyTags());
      this.currentUserInput = "";
    }
  }

  deleteTagAt(index: number) {
    this.tags.splice(index, 1);
  }

  private deepCopyTags(): TagsInputTag[] {
    return JSON.parse(JSON.stringify(this.tags));
  }
}

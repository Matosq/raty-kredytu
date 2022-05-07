import { FormControlStatus } from "@angular/forms";

export class Section {
  protected isFieldValid(formControlStatus: FormControlStatus): boolean {
    return formControlStatus !== "INVALID";
  }
}

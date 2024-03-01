import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from '../../models';
@Component({
  selector: 'app-registry-modal',
  templateUrl: 'registry.modal.html',
  styleUrls: ['registry.modal.css']
})
export class RegistryModal implements OnInit {
  minDate = "1900-01-01";
  maxDate = "2024-12-31";
  public user: UserModel = new UserModel;
  public userForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    formBuilder: FormBuilder
  ) {
    let t = this;
    t.userForm = formBuilder.group({
      Name: ['', Validators.required],
      Surname: ['', Validators.required],
      Email: ['', Validators.required],
      Password: ['', Validators.required],
      BirthDay: ['', Validators.required]
    });
  }
  ngOnInit(): void {
  }
  get Name() { return this.userForm.get('Name'); }
  get Surname() { return this.userForm.get('Surname'); }
  get Email() { return this.userForm.get('Email'); }
  get Password() { return this.userForm.get('Password'); }
  get BirthDay() { return this.userForm.get('BirthDay'); }
  public markFormGroupTouchedAndDirty(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();
      control.updateValueAndValidity();

      if (control.controls) {
        this.markFormGroupTouchedAndDirty(control);
      }
    });
  }
  SendUserIindo() {
    let t = this;
    if (!t.userForm.valid) {
      t.markFormGroupTouchedAndDirty(t.userForm);
      return;
    }
    t.user.Name = t.Name.value;
    t.user.Surname = t.Surname.value;
    t.user.Email = t.Email.value;
    t.user.Password = t.Password.value;
    t.user.BirthDay = t.BirthDay.value;
    t.activeModal.close(t.user);
  }
  public checkIsInvalid(input: any): boolean {
    return input.invalid && input.dirty && !input.untouched;
  }
}

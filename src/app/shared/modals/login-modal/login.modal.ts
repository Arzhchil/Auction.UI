import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from '../../models';
@Component({
  selector: 'app-login-modal',
  templateUrl: 'login.modal.html',
  styleUrls: ['login.modal.css']
})
export class LoginModal implements OnInit {
  public user: UserModel = new UserModel;
  public userForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    formBuilder: FormBuilder
  ) {
    let t = this;
    t.userForm = formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
  }
  get Email() { return this.userForm.get('Email'); }
  get Password() { return this.userForm.get('Password'); }
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
    t.user.Email = t.Email.value;
    t.user.Password = t.Password.value;
    t.activeModal.close(t.user);
  }
  public checkIsInvalid(input: any): boolean {
    return input.invalid && input.dirty && !input.untouched;
  }
}

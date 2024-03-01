import { Component, OnInit } from '@angular/core';
import { LotsModel, UserModel, LoginModel } from '../../shared/models';
import { LotsService, UserService } from '../../shared/services';
import { lastValueFrom } from 'rxjs';
import { RegistryModal } from '../../shared/modals/registry-modal/registry.modal';
import { LoginModal } from 'src/app/shared/modals/login-modal/login.modal';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {
  public modalRef: NgbModalRef;
  lots: LotsModel[] = [];
  lotsGroup: any[];
  currentUser: any;
  badReq: boolean = false;
  public userId: () => number;
  constructor(
    public lotsService: LotsService,
    private modalService: NgbModal,
    private userService: UserService,) {
    let t = this;
    if (!t.userService.getCredential()) {
      console.log('current user not find')
    }
    t.userId = () => {
      return +t.userService.getCredential();
    }
  }
  ngOnInit(): void {
    let t = this;
    t.getLots()
  }
  public async getLots() {
    let t = this;
    await lastValueFrom(this.lotsService.getLots())
      .then(response => {
        t.lots = response;
        console.log('lots')
        console.log(t.lots)
      })
      .catch(ex => {
        console.log(ex)
      })
  }
  public async ShowRegistryModal() {
    let t = this;
    // todo: вывести инфу о комиссии сети в модалке подтверждения
    t.modalRef = t.modalService.open(RegistryModal,
      {
        modalDialogClass: 'main-modal-custom',
        centered: true,
        size: 'lg',
        windowClass: 'super-modal-delete-users very-nice-shadow',
        animation: true
      });
    t.modalRef
      .result.then((result) => {
        if (result) {
          //записываем полученное значение из модалки
          t.registerUser(result);
        }
      });
  }
  public async registerUser(user: UserModel) {
    let t = this;
    await lastValueFrom(t.userService.RegisterUser(user))
      .then(response => {
        if (response) {
          t.userService.setCredential(response);
          console.log('response')
          console.log(response)
          t.currentUser = response;
          console.log('currentUser')
          console.log(t.currentUser)
        }
        if (t.currentUser.id !== 0) {
          t.badReq = true
        }
      })
      .catch(ex => {
        console.log(ex)
      })
      .finally(() => {
      })
  }
  public async ShowLoginModal() {
    let t = this;

    // todo: вывести инфу о комиссии сети в модалке подтверждения
    t.modalRef = t.modalService.open(LoginModal,
      {
        modalDialogClass: 'main-modal-custom',
        centered: true,
        size: 'lg',
        windowClass: 'super-modal-delete-users very-nice-shadow',
        animation: true
      });
    t.modalRef
      .result.then((result) => {
        if (result) {
          //записываем полученное значение из модалки
          t.loginUser(result); //!!
        }
      });
  }
  public async loginUser(user: LoginModel) {
    let t = this;
    await lastValueFrom(t.userService.LoginUser(user))
      .then(response => {
        if (response) {
          t.userService.setCredential(response);
          console.log('response')
          console.log(response)
          t.currentUser = response;
          console.log('currentUser')
          console.log(t.currentUser)
        }
        if (t.currentUser.id !== 0) {
          t.badReq = true
        }
      })
      .catch(ex => {
        console.log(ex)
      })
      .finally(() => {
      })
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageModal } from './message.modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    MessageModal
  ],
  imports: [
    CommonModule,
    NgbModule
  ]
})
export class MessageModule { }

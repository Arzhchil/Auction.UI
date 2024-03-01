import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-message-modal',
    templateUrl: 'message.modal.html',
    styleUrls: ['message.modal.scss']
})

export class MessageModal implements OnInit{
    @Input() message:string = "";
    constructor(
        public activeModal: NgbActiveModal,
    ){
    }

    ngOnInit(): void {
    }
}

import { Component, OnInit } from '@angular/core';
import { LotsModel } from '../../shared/models';
import { LotsService } from '../../shared/services';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  lotsModel: LotsModel[] = [];
  lotsGroup: any[] | undefined;

  constructor(public lotsService: LotsService) {
  }
  ngOnInit(): void {
    let t = this;
    console.log("123")
    t.getLots()
  }

  public async getLots() {
    let t = this;
    await lastValueFrom(t.lotsService.GetAllLots())
      .then(response => {
        t.lotsGroup = response;
        console.log('Response' + response)
        console.log('lotsGroup' + t.lotsGroup)
      })
      .catch(ex => {
        console.log(ex)
      })
      .finally(() => {
      })
  }

}


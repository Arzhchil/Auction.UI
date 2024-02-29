import { Component, OnInit } from '@angular/core';
import { LotsModel } from '../../shared/models';
import { LotsService } from '../../shared/services';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  lots: LotsModel[] = [];
  lotsGroup: any[];

  constructor(
    public lotsService: LotsService,
    private router: Router,) {
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

  public navigate() {
    let t = this;
    t.router.navigate(['login'])
  }

}


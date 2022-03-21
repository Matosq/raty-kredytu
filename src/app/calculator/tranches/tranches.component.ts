import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tranches',
  templateUrl: './tranches.component.html',
  styleUrls: ['./tranches.component.scss']
})
export class TranchesComponent implements OnInit {
  public cardHeader = 'transze';
  constructor() { }

  ngOnInit(): void {
  }

}

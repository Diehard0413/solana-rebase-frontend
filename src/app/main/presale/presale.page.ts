import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presale',
  templateUrl: './presale.page.html',
  styleUrls: ['./presale.page.scss'],
})
export class PresalePage implements OnInit {

  segment: string = "contribute";
  constructor() { }

  ngOnInit() {
  }

}

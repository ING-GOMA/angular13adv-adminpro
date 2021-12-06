import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component  {

  public labels1: string[] = ['pan', 'refresco', 'tacos'];
  public data1 = [
    [10, 20, 50],

  ];


}

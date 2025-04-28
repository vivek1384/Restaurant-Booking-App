import {} from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Restaurant';
}

export class Table {
  name: string;
  time: string;
  lord: string;
  person: string;
  date: string;
  id: any;
  booked: boolean;

  constructor() {
    (this.name = ''),
      (this.time = ''),
      (this.lord = ''),
      (this.person = ''),
      (this.id = undefined),
      (this.booked = false),
      (this.date = '');
  }
}

export class BookedData {
  name: string;
  mono: string;
  id: any;
  table: Table;
  userId: any;
  preOrdered : boolean;
  constructor() {
    (this.name = ''),
      (this.mono = ''),
      (this.id = undefined),
      (this.table = new Table()),
      (this.userId = undefined);
    this.preOrdered = false
  }
}

export class User {
  name: string;
  password: string;
  email: string;
  id: any;

  constructor() {
    this.name = '';
    this.password = '';
    this.email = '';
    this.id = undefined;
  }
}

export class Special {
  id: any;
  name: string;
  time: string;
  person: string;
  date: string;
  booked: boolean;
  constructor() {
    this.id = undefined;
    this.time = '';
    this.person = '';
    this.date = '';
    this.booked = false;
    this.name = '';
  }
}

export class SpecialBook {
  id: any;
  name: string;
  mono: string;
  data: Special;
  userId: any;
  constructor() {
    this.id = undefined;
    this.name = '';
    this.mono = '';
    this.data = new Special();
    this.userId = '';
  }
}

export class Order {
  id: any;
  item1: string;
  item2: string;
  item3: string;
  tableId: string;
  userId: string;
  time: string;
  date: string;
  name: string;
  person: string;
  table: BookedData;
  desc: string
  constructor() {
    this.id = undefined;
    this.item1 = '';
    this.item2 = '';
    this.item3 = '';
    this.tableId = '';
    this.userId = '';
    this.time = '';
    this.date = '';
    this.name = '';
    this.person = '';
    this.table = new BookedData();
    this.desc = ""
  }
}

export class Menu{
  name: string;
  price : string;
  id: any;
  constructor(){
    this.name = '';
    this.price = '';
    this.id = undefined;
  }
}

export class Favourites{
  name: string;
  id: any;
  userId : any;
  itemId:any
  price: string
  constructor(){
    this.name = '';
    this.price = '';
    this.id = undefined;
    this.userId = undefined;
    this.itemId = undefined;
  }
}

export class Review{
  id:any;
  rating: string;
  review: string;
  userName: string;
  constructor(){
    this.id = undefined;
    this.rating = ''
    this.review = ''
    this.userName = ''
  }
}
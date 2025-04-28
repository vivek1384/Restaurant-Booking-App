import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ServiceService } from '../service.service';
import { BookedData, Review, Table } from '../app.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { NgStyle } from '@angular/common';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-home',
  imports: [RouterLink, FormsModule, NgStyle, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  icon = faStar;

  service = inject(ServiceService);
  service2 = inject(UserService);
  router = inject(Router);
  tableDate = '';

  isActive = false;
  isOpen = false;

  ifPerson = false;
  personOrtime() {
    this.ifPerson = !this.ifPerson;
  }

  tabData: Table = new Table();
  tabList: Table[] = [];
  tablistOflunch: Table[] = [];
  tablistOfdinner: Table[] = [];
  timeList1 = ['11:30', '12:00', '12:30', '01:00'];
  timeList2 = ['07:30', '08:00', '08:30', '09:00', '09:30'];
  person = ['2', '4', '6', '8', '10', '16'];
  tabInput: any = [];
  avalTable: Table[] = [];
  dateTablelist: Table[] = [];

  avalTime = '';
  avalPerson = '';

  tabBooking: BookedData = new BookedData();
  review: Review = new Review();

  lorD = 'Lunch';

  userName: string = '';
  id = localStorage.getItem('id');

  getUser() {
    this.service2.getUserbyId(this.id).subscribe((res) => {
      this.userName = res.name;
    });
  }

  logOut() {
    let isDel = confirm('Are you sure?');
    if (isDel) {
      localStorage.removeItem('id');
      this.router.navigate(['login']);
    }
  }

  onTime() {
    this.isActive = !this.isActive;
    console.log(this.isActive);
  }

  onClick() {
    if (this.lorD == 'Lunch') {
      this.lorD = 'Dinner';
    } else {
      this.lorD = 'Lunch';
    }
  }

  onTimeClick(time: string) {
    this.avalTable = [];
    this.avalTime = time;
    this.avalTable = this.dateTablelist.filter((item) =>
      item.time.includes(this.avalTime)
    );
    console.log(this.avalTable);
  }

  ondate(date: string) {
    this.dateTablelist = [];
    this.dateTablelist = this.tabList.filter((item) => item.date === date);
    console.log(this.dateTablelist);
    this.avalTable = this.dateTablelist;
  }

  onPersonClick(personString: string) {
    this.avalTable = [];
    this.avalPerson = personString;
    debugger;
    this.avalTable = this.tabList.filter((item) =>
      item.person.includes(this.avalPerson)
    );
    console.log(this.avalTable);
  }

  ngOnInit(): void {
    this.getallTable();
    this.lunch();
    this.dinner();
    this.getReveiwlist();
    setTimeout(() => {
      this.getUser();
    }, 100);
    setTimeout(() => {
      this.isOpen = true;
    }, 5000);
  }

  getallTable() {
    this.service.getTabList().subscribe((res) => {
      if (res) {
        this.tabList = res;
      }
    });
  }
  lunch() {
    this.service.lunch().subscribe((res) => {
      if (res) {
        this.tablistOflunch = res;
      }
    });
  }
  dinner() {
    this.service.dinner().subscribe((res) => {
      if (res) {
        this.tablistOfdinner = res;
      }
    });
  }

  tabList2: Table[] = [];

  data: Table = new Table();

  isShow = false;

  booking(data2: Table) {
    if (data2.booked == true) {
      alert('Table already booked.');
    } else {
      this.isShow = true;
      this.data = data2;
    }
  }

  reset() {
    this.tabInput = [];
    this.tabList2 = [];
    this.resetBtn = false;
  }

  resetBtn = false;

  blur(tabBooking: BookedData) {
    tabBooking.table.booked = false;
    this.isShow = false;
  }

  onBooked(bookingData: BookedData) {
    bookingData.table = this.data;
    bookingData.userId = localStorage.getItem('id');
    bookingData.table.booked = true;
    this.service.addBookTable(bookingData).subscribe((res) => {
      if (res) {
        this.isShow = false;
        alert('Table booked successfully!');
        this.tabList2 = [];
        this.tabInput = [];
        this.resetBtn = false;
      }
    });
    this.service
      .addBookEdit(bookingData.table, bookingData.table.id)
      .subscribe((res) => {
        if (res) {
          console.log('Table booked as well as table data change.');
        }
      });
  }

  submitReview(review: Review) {
    this.service.submitReview(review).subscribe((res) => {
      if (res) {
        alert('Review submitted successfully!');
        this.close();
        this.getReveiwlist();
      }
    });
  }
  close() {
    this.isOpen = false;
    this.review = new Review();
  }
  reveiw: Review = new Review();
  reveiwList: Review[] = [];

  getReveiwlist() {
    this.service.getReviewlist().subscribe((res) => {
      if (res) {
        this.reveiwList = res;
      }
    });
  }
}

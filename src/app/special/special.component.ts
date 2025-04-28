import { Component, inject, OnInit } from '@angular/core';
import { Special, SpecialBook } from '../app.component';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../service.service';
import { NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-special',
  imports: [FormsModule, NgStyle, RouterLink],
  templateUrl: './special.component.html',
  styleUrl: './special.component.css',
})
export class SpecialComponent implements OnInit{
  data: Special = new Special();

  dataList: Special[] = [];

  dataList2 : Special[] = [];

  ocsBooking : SpecialBook = new SpecialBook()

  service = inject(ServiceService);

  name1 = "Birthday"
  name2 = "Wedding"
  name3 = "Engagement"

  isShow = false

  ngOnInit(): void {
      this.getList()
  }

  getList() {
    this.service.getList().subscribe((res)=>{
      if(res){
        this.dataList = res;
      }
    })
  }
  getPartiList(nameString:string){
    this.dataList2 = this.dataList.filter((item) => 
    item.name == nameString
    )
    console.log(this.getPartiList)
  }
  booking(item:Special){
    if(item.booked == true){
      alert("Table already booked.")
    }else{
      this.isShow = true;
      this.data = item;
    }
  }

  onBooked(ocsBooking:SpecialBook){
    ocsBooking.data = this.data;
    ocsBooking.userId = localStorage.getItem('id');
    ocsBooking.data.booked = true;
    this.service.addBookosc(ocsBooking).subscribe((res) => {
      if (res) {
        this.isShow = false;
        alert('Table booked successfully!');
      }
    });
    this.service
      .editBookOsc(ocsBooking.data, ocsBooking.data.id)
      .subscribe((res) => {
        if (res) {
        }
      });
  }
  
  blur(ocsBooking:SpecialBook){
    ocsBooking.data.booked = false
    this.isShow = false;
  }
}


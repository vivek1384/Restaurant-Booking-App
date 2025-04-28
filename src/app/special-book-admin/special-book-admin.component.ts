import { Component, inject, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Special, SpecialBook } from '../app.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-special-book-admin',
  imports: [FormsModule, RouterLink],
  templateUrl: './special-book-admin.component.html',
  styleUrl: './special-book-admin.component.css',
})
export class SpecialBookAdminComponent implements OnInit {
  service = inject(ServiceService);
  data: SpecialBook = new SpecialBook();
  dataList: Special[] = [];
  allBookedOsc: SpecialBook[] = [];
  inputText = '';
  onInput = false;
  bookedOsc: SpecialBook[] = [];

  ngOnInit(): void {
    this.getAll();
    this.getAll2();
  }

  getAll() {
    this.service.getAllOcs().subscribe((res) => {
      if (res) {
        this.dataList = res;
      }
    });
  }

  getAll2() {
    this.service.getBookedOsc().subscribe((res) => {
      if (res) {
        this.allBookedOsc = res;
      }
    });
  }

  onChange() {
    this.onInput = true;
    this.bookedOsc = this.allBookedOsc.filter((song) =>
      song.id.toLowerCase().includes(this.inputText.toLowerCase())
    );
    if (this.inputText == '') {
      this.bookedOsc = [];
      this.onInput = false;
    }
  }
  onChange2() {
    this.onInput = false;
    this.inputText = '';
  }

  delete(id: any) {
    let isDel = confirm('Are you sure?');
    if (isDel) {
      this.service.delete01(id).subscribe((res)=>{
        if(res){
          this.getAll();
        }
      })
    }
  }
  delete1(id:any, id2:any, item:Special){
    let isDel = confirm("Are you sure?")
    if(isDel){
      item.booked = false;
      this.service.delete02(id).subscribe((res)=>{
        if(res){
          this.service.delete03(id2, item).subscribe((res)=>{
            if(res){
              this.getAll();
              this.getAll2();
            }
          })
        }
      })
    }
  }
}

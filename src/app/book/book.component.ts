import { Component, inject, OnInit } from '@angular/core';
import { BookedData, Table } from '../app.component';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book',
  imports: [FormsModule, RouterLink],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent implements OnInit {
  bookedTable: BookedData[] = [];
  allBookedtable: BookedData[] = [];

  allTable: Table[] = [];
  // allBookedTable :
  inputText = '';
  onInput = false;

  ngOnInit(): void {
    this.getAll();
    this.getTableLunch();
  }

  service = inject(ServiceService);

  onChange() {
    this.onInput = true;
    this.bookedTable = this.allBookedtable.filter((song) =>
      song.id.toLowerCase().includes(this.inputText.toLowerCase())
    );
    if (this.inputText == '') {
      this.bookedTable = [];
      this.onInput = false;
    }
  }

  onChange2() {
    this.onInput = false;
    this.inputText = '';
  }

  getAll() {
    this.service.allBookedtable().subscribe((res) => {
      if (res) {
        this.allBookedtable = res;
      }
    });
  }

  delete(id: any) {
    let isDel = confirm('Are you sure?');
    if (isDel) {
      this.service.delete(id).subscribe((res) => {
        if (res) {
          this.getTableLunch();
        }
      });
    }
  }
  delete2(id: any, id2: any, item: Table) {
    let isDel = confirm('Are you sure?');
    if (isDel) {
      item.booked = false;
      this.service.delete2(id).subscribe((res) => {
        if (res) {
          this.service.delete3(id2, item).subscribe((res) => {
            if (res) {
              this.getAll();
              this.getTableLunch();
            }
          });
        }
      });
    }
  }

  getTableLunch() {
    this.service.lunch().subscribe((res) => {
      if (res) {
        this.allTable = res;
      }
    });
  }
  getTableDinner() {
    this.service.dinner().subscribe((res) => {
      if (res) {
        this.allTable = res;
      }
    });
  }
}

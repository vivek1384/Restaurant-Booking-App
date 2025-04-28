import { Component, inject, input, OnInit } from '@angular/core';
import { Order } from '../app.component';
import { ServiceService } from '../service.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order',
  imports: [FormsModule, RouterLink],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit {
  data: Order = new Order();
  dataList: Order[] = [];

  service = inject(ServiceService);

  ngOnInit(): void {
    this.getdatalist();
  }

  onInput = false;
  inputText = '';
  bookedTable: Order[] = [];

  getdatalist() {
    this.service.getPreorderdata().subscribe((res) => {
      if (res) {
        this.dataList = res;
      }
    });
  }

  onChange() {
    this.onInput = true;
    this.bookedTable = this.dataList.filter((item) =>
      item.tableId.toLowerCase().includes(this.inputText.toLowerCase())
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
  cancel(id: any, item: Order) {
    let isDel = confirm('Are you sure?');
    if (isDel) {
      this.service.deletePre(id).subscribe((res) => {
        if (res) {
          item.table.preOrdered = false;
          this.service
            .editBookedtable(item.tableId, item.table)
            .subscribe((res) => {
              if (res) {
                this.getdatalist();
                this.onChange2();
                console.log("Ordered table data changed.")
              }
            });
        }
      });
    }
  }
}

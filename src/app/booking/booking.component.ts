import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookedData, Favourites, Menu, Order } from '../app.component';
import { ServiceService } from '../service.service';
import { FormsModule } from '@angular/forms';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-booking',
  imports: [RouterLink, FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {

  table : BookedData = new BookedData()
  tableList : BookedData[] = []

  orederData : Order = new Order();

  service = inject(ServiceService)

  ngOnInit(): void {
    this.getTablelist(); 
    this.favlist();
    this.getAllitems();
  }

  id = localStorage.getItem('id')

  getTablelist(){
    this.service.getTablesbyUser(this.id).subscribe((res)=>{
      if(res){
        this.tableList = res;
      }
    })
  }

  isShow = false


  preOrder(id:any, id2:any, time:string, date:string, name:string, person:string, data:BookedData){
    this.isShow = true
    this.orederData.tableId = id;
    this.orederData.userId = id2;
    this.orederData.time = time;
    this.orederData.date = date;
    this.orederData.name = name;
    this.orederData.person = person;
    this.orederData.table = data;
  }
  close(){
    this.isShow = false
  }
  preOrder2(data:Order){
    this.service.addOrder(data).subscribe((res)=>{
      if(res){
        alert("Pre order successfully placed.")
        this.isShow = false
        this.orederData.table.preOrdered = true
        this.service.editBookedtable(data.tableId, data.table).subscribe((res)=>{
          if(res){
            this.orederData.desc = ""
          }
        })
      }
    })
  }

  favItems : Favourites[] = []
  allItems : Menu[] = []
 
  favlist(){
    this.service.getfavlist(localStorage.getItem('id')).subscribe((res)=>{
      if(res){
        this.favItems = res;
      }
    })
  }

  getAllitems(){
    this.service.getItemList().subscribe((res)=>{
      if(res){
        this.allItems = res;
      }
    })
  }
}

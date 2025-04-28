import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Menu, Special, Table } from '../app.component';
import { ServiceService } from '../service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  timeList1 = ['11:30', '12:00','12:30','01:00']
  timeList2 = ['07:30', '08:00','08:30','09:00', '09:30']
  timeList3: any = []

  tableData : Table = new Table()
  ocassionData : Special = new Special()
  menuData : Menu = new Menu();

  service = inject(ServiceService)

  onChange(value:string){
    if(value=="Lunch"){
      this.timeList3 = this.timeList1
    }
    else{
      this.timeList3 = this.timeList2
    }
  }

  addTable(tab:Table){

    if(!tab.name || !tab.lord || !tab.time || !tab.person){
      alert("Please fill all the fields first.")
    }
    else if(tab.lord && tab.name && tab.person && tab.time){
      this.service.add(tab).subscribe((res=>{
        alert("Table added.")
        this.tableData = new Table();
      }))
    }

  }

  addOcassion(ocs:Special){
    if(!ocs.name || !ocs.time || !ocs.date ||!ocs.person){
      alert("Please fill all the fields first.")
    }
    else if(ocs.date && ocs.name && ocs.person && ocs.time){
      this.service.addOcs(ocs).subscribe((res)=>{
        if(res){
          alert("Special Ocassion added successfully.")
          this.ocassionData = new Special()
        }
      })
    }
  }

  addItem(menu:Menu){
    if(!menu.name || !menu.price ){
      alert("Please fill all the fields first.")
    }
    else if( menu.name && menu.price ){
      this.service.addItem(menu).subscribe((res)=>{
        if(res){
          alert("Menu item added successfully.")
          this.menuData = new Menu()
        }
      })
    }
  }

}

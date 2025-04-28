import { Component, inject, OnInit } from '@angular/core';
import { Favourites, Menu } from '../app.component';
import { ServiceService } from '../service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  item: Menu = new Menu();
  itemList: Menu[] = [];

  fav: Favourites = new Favourites();
  favList: Favourites[] = [];

  service = inject(ServiceService);
  isBtn = true;

  ngOnInit(): void {
    this.getAll();
    this.getFavList();
  }

  getAll() {
    this.service.getItemList().subscribe((res) => {
      if (res) {
        this.itemList = res;
      }
    });
  }

  getFavList() {
    this.service.getfavlist(localStorage.getItem('id')).subscribe((res) => {
      if (res) {
        this.favList = res;
      }
    });
  }

  addTofav(data: Menu) {
    this.fav.name = data.name;
    this.fav.price = data.price;
    this.fav.itemId = data.id;
    this.fav.userId = localStorage.getItem('id');
    if (this.favList.length == 0) {
      this.service.addTofav(this.fav).subscribe((res) => {
        if (res) {
          alert('Item added to favourites.');
          this.getFavList();
        }
      });
    } else {
      let arr = false;
      for (let index = 0; index < this.favList.length; index++) {
        if (this.favList[index].itemId == data.id) {
          arr = true;
          alert("Item is already added to the favourites.")
        }
      }
      if (!arr) {
        this.service.addTofav(this.fav).subscribe((res) => {
          if (res) {
            // console.log('hi');
            alert('Item added to favourites.');
            this.getFavList();
          }
        });
      }
    }
  }

  remove(id:any){
    let isDel = confirm("Are you sure?")
    if(isDel){
    this.service.removeFromfavList(id).subscribe((res)=>{
      if(res){
        this.getFavList();
      }
    })
    }
  }
}

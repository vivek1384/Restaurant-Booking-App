import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BookedData, Favourites, Menu, Order, Review, Special, SpecialBook, Table } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  http = inject(HttpClient)

  add(tab:Table){
    return this.http.post("http://localhost:3000/table", tab)
  }
  delete(id:any){
    return this.http.delete("http://localhost:3000/table/"+id)
  }
  delete2(id:any){
    return this.http.delete("http://localhost:3000/bookedTable/"+id)
  }
  delete3(id:any, item:Table){
    return this.http.put(`http://localhost:3000/table/${id}`, item)
  }
  getTabList(){
    return this.http.get<Table[]>("http://localhost:3000/table")
  }

  lunch(){
    return this.http.get<Table[]>("http://localhost:3000/table?lord=Lunch&booked=false")
  }
  dinner(){
    return this.http.get<Table[]>("http://localhost:3000/table?lord=Dinner&booked=false")
  }
  getTables(lord:string, time:string, person: string, booked:boolean){
    // debugger
    return this.http.get<Table[]>(`http://localhost:3000/table?lord=${lord}&time=${time}&person=${person}&booked=${booked}`)
  }
  addBookTable(bookingData: BookedData){
    return this.http.post("http://localhost:3000/bookedTable", bookingData)
  }
  addBookEdit(data:Table, id: any){
    return this.http.put("http://localhost:3000/table/"+id, data)
  }
  getTablesbyUser(id:any){
    return this.http.get<BookedData[]>("http://localhost:3000/bookedTable?userId="+id)
  }
  allBookedtable(){
    return this.http.get<BookedData[]>("http://localhost:3000/bookedTable")
  }
  getall(){
    return this.http.get<Table[]>("http://localhost:3000/table")
  }
  addOcs(ocs:Special){
    return this.http.post("http://localhost:3000/Ocasion", ocs)
  }
  getList(){
    return this.http.get<Special[]>("http://localhost:3000/Ocasion")
  }
  addBookosc(osc:SpecialBook){
    return this.http.post("http://localhost:3000/BookedOscation", osc)
  }
  editBookOsc(osc:Special, id:any){
    return this.http.put("http://localhost:3000/Ocasion/"+id, osc)
  }
  getAllOcs(){
    return this.http.get<Special[]>("http://localhost:3000/Ocasion?booked=false")
  }
  getBookedOsc(){
    return this.http.get<SpecialBook[]>("http://localhost:3000/BookedOscation")
  }
  delete01(id:any){
    return this.http.delete("http://localhost:3000/Ocasion/"+id)
  }
  delete02(id:any){
    return this.http.delete("http://localhost:3000/BookedOscation/"+id)
  }
  delete03(id:any, item:Special){
    return this.http.put("http://localhost:3000/Ocasion/"+id, item)
  }
  getOcslistByuser(id:any){
    return this.http.get<SpecialBook[]>("http://localhost:3000/BookedOscation?userId="+id)
  }
  addOrder(data:Order){
    return this.http.post("http://localhost:3000/oreder", data)
  }
  editBookedtable(id:any, data:BookedData){
    return this.http.put("http://localhost:3000/bookedTable/"+id, data)
  }

  getPreorderdata(){
    return this.http.get<Order[]>("http://localhost:3000/oreder")
  }
  deletePre(id:any){
    return this.http.delete("http://localhost:3000/oreder/"+id)
  }
  addItem(item:Menu){
    return this.http.post("http://localhost:3000/item", item)
  }
  getItemList(){
    return this.http.get<Menu[]>("http://localhost:3000/item")
  }
  addTofav(data:Favourites){
    return this.http.post("http://localhost:3000/favourites", data)
  }
  getfavlist(id:any){
    return this.http.get<Favourites[]>("http://localhost:3000/favourites?userId="+id)
  }
  removeFromfavList(id:any){
    return this.http.delete("http://localhost:3000/favourites/"+id)
  }
  submitReview(data:Review){
    return this.http.post("http://localhost:3000/review", data)
  }
  getReviewlist(){
    return this.http.get<Review[]>("http://localhost:3000/review");
  }
  constructor() { }
}

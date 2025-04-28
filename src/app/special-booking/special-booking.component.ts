import { Component, inject, OnInit } from '@angular/core';
import { Special, SpecialBook } from '../app.component';
import { ServiceService } from '../service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-special-booking',
  imports: [RouterLink],
  templateUrl: './special-booking.component.html',
  styleUrl: './special-booking.component.css',
})
export class SpecialBookingComponent implements OnInit {
  ocs: Special = new Special();
  ocsList: SpecialBook[] = [];

  service = inject(ServiceService);

  ngOnInit(): void {
      this.getOcslist()
  }

  id = localStorage.getItem('id')

  getOcslist(){
    this.service.getOcslistByuser(this.id).subscribe((res)=>{
      if(res){
        this.ocsList = res;
      }
    })
  }

}



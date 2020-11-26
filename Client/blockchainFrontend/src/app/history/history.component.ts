import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  history : any;
  batchID : string ="";

  constructor(private http : HttpClientService) { }

  ngOnInit(): void {
  }

  getHistory(batchID){
    console.log(batchID)
    this.http.getHistory({'batchID' : batchID}).
    subscribe(
      history => {
        this.history = history.history
        console.log(this.history)
      }
    )
  }
}

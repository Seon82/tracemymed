import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  publicKeyRecipient : string = "";
  batchID : string = "";

  constructor(private http : HttpClientService) { }

  ngOnInit(): void {
  }

  newTransaction(){
    if (localStorage["publicKey"] !== undefined){
      console.log("public key : " + localStorage["publicKey"])
      console.log("recipient: " + this.publicKeyRecipient)
      console.log("batchID : " + this.batchID)

      let values = {
        'sender' : localStorage["publicKey"],
        'recipient' : 'publicKeyRecipient', 
        'batchID' : this.batchID
      }
      this.http.createNewTransaction(values);
    }

    else{
      alert('create a wallet first!')
    }


  }

}

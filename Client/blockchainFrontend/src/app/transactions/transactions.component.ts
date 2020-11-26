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
  signedMessage :any;
  confirmation : any;

  constructor(private http : HttpClientService) { }

  ngOnInit(): void {
  }

  getTransactionInput(values){
    this.http.getTransactionInput(values).subscribe(
        response => {
          values['transaction_input'] = response.transaction_input
          // var strMessage = JSON.stringify(values, Object.keys(values).sort())
          
          var toSign = {
            'privateKey' : localStorage["privateKey"],
            'message' : values
          }
          console.log("TYPE")
          console.log(typeof(toSign.privateKey))
          this.getSignature(toSign, values);

      }
    )
  }

  getSignature(toSign, values){
    console.log("privateKey = " + toSign['privateKey'] )
    this.http.signMessage(toSign).subscribe(
      message => {
        this.signedMessage = message
        console.log(this.signedMessage)
        values['signature'] = this.signedMessage
        console.log(values)
        this.http.createNewTransaction(values).subscribe(
          confirmation => {
            console.log(confirmation)
            this.confirmation = confirmation.message;
          }
        )
      }
    )
  }
  newTransaction(){
    if (localStorage["publicKey"] !== undefined){
      console.log("public key : " + localStorage["publicKey"])
      console.log("recipient: " + this.publicKeyRecipient)
      console.log("batchID : " + this.batchID)

      var values = {
        'sender' : localStorage["publicKey"],
        'recipient' : this.publicKeyRecipient, 
        'batchID' : this.batchID
      }

      this.getTransactionInput(values)
      

    }

    else{
      alert('create a wallet first!')
    }


  }

}

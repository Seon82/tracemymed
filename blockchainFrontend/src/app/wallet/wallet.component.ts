import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../http-client.service';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  publicKey : string = "";
  privateKey : string = "";
  keys : any;
  generated : any;
  constructor(private http : HttpClientService) { }

  ngOnInit(): void {
    this.publicKey = localStorage.getItem('publicKey')
    this.generated = localStorage.getItem('generated')
  }

  generateKeys():void{
    if (this.generated === false || this.generated === null){

      this.publicKey = localStorage.getItem('publicKey');
      localStorage['publicKey'] = "test";
      this.publicKey = localStorage.getItem('publicKey');
      localStorage['generated'] = true;
      this.generated = localStorage.getItem('generated');

      // this.keys = this.http.getKeys();     

    }
    else{
      alert("Keys already generated");
    }
    // this.keys = this.http.getKeys();
  }

}

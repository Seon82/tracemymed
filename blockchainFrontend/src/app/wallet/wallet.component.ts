import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../http-client.service';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  publicKey : any;
  privateKey : any;
  keys : any;

  constructor(private http : HttpClientService) { }

  ngOnInit(): void {
    this.publicKey = "";
    this.privateKey = "";
  }

  generateKeys():void{
    this.keys = this.http.getKeys()
  }

}

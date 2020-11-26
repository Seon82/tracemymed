import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../http-client.service';


@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.css']
})
export class BlockchainComponent implements OnInit {

  constructor(private http : HttpClientService) { }

  chain : any = [];
  UTXO : any = []

  ngOnInit(): void {
    this.getChain();
  }

  displayChain(){
    
  }

  getChain(){
    this.http.getChain().
    subscribe(
      chain => {
        this.chain = chain.chain
        console.log(this.chain)
        this.displayChain();
        this.getUTXO();
      }
    )
  }

  getUTXO(){
    this.http.getUTXO().
    subscribe(
      UTXO => {
        this.UTXO = UTXO.utxo
        console.log(this.UTXO)
        this.displayChain();

      }
    )
  }
}

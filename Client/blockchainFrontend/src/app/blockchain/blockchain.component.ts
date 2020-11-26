import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../http-client.service';


@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.css']
})
export class BlockchainComponent implements OnInit {

  constructor(private http : HttpClientService) { }

  chain = [
        {
            "index": 1,
            "merkleroot": null,
            "previous_hash": 1,
            "proof": 100,
            "timestamp": 1606417461.7530649,
            "transactions": []
        },
        {
            "index": 2,
            "merkleroot": "970209b15adf4682c00c6e02a16728f87503d12c5bbb61b91e81c44b567ea053",
            "previous_hash": "359655b6f34e37fdda87be8d6af57160010753f6adc54d0edb311b8dbb830582",
            "proof": 35293,
            "timestamp": 1606417555.9636388,
            "transactions": [
                {
                    "batchID": "123",
                    "recipient": "-----BEGIN PUBLIC KEY-----\nMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEQ1v8772FCBYeCXC2yZMenDCbwpng+2Ap\nPA2CIg4a7wbrblM7deh3Q9WEigsTYg1oWPRSuC0yEzxblVAabeeNug==\n-----END PUBLIC KEY-----\n",
                    "sender": "-----BEGIN PUBLIC KEY-----\nMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAE7MTrJ3EZkwF/cz/Hv9OmmK1kI3oRQ4ow\nzqZ0wDQaqMkCSaoNdDgN6Hvj38E0VbwZ0cuEnQmuhMjxBJ61EHwiJQ==\n-----END PUBLIC KEY-----\n",
                    "signature": "MEUCIGDFfFyW1+0tJAqVH4AA9Hv3WX8F0WTkVhQFalvyqIkBAiEAu8uuu2vicsGHRJ8tdo4zHDAH8swB3amDfWj2lAGoKqE=",
                    "transaction_input": ""
                }
            ]
        },
        {
            "index": 3,
            "merkleroot": "e29f954ee7b7228964917914f29f8773fad10f6de18a13bd047190e5debe12a3",
            "previous_hash": "0f81b9c866792acf77695b5524d7ca8214e3ff323aaf5609416b420f33581f6d",
            "proof": 35089,
            "timestamp": 1606417594.7462196,
            "transactions": [
                {
                    "batchID": "123",
                    "recipient": "-----BEGIN PUBLIC KEY-----\nMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEFkXrkzf9+BfgJ5fMk58quW1rVWUTuH6/\nVmm/o1EqTrCbTgTipPGgXNfjQXSV+f1qMzBrpA8xTfLaO9cgd9I2tA==\n-----END PUBLIC KEY-----\n",
                    "sender": "-----BEGIN PUBLIC KEY-----\nMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEQ1v8772FCBYeCXC2yZMenDCbwpng+2Ap\nPA2CIg4a7wbrblM7deh3Q9WEigsTYg1oWPRSuC0yEzxblVAabeeNug==\n-----END PUBLIC KEY-----\n",
                    "signature": "MEQCIFl5U5xP0qIARM9SknnMNVwWr+jUd1gcCodPNNPJHmOyAiAgpLHFhK0rIdNy5kdVvDGLy9H63Rnp5XEOlxrABwumUQ==",
                    "transaction_input": "528277844f526306451a6277b93e73bc6158f49752cd2400a74424209cc9cccd"
                }
            ]
        },
        {
            "index": 4,
            "merkleroot": "8f73677756806493790cf75dc769f3851619b63f030437959a7d7db83353f898",
            "previous_hash": "8fa744ff9f1d95c877d6c46ee41149ec20243fef2b7f573d4d3d09c532732919",
            "proof": 119678,
            "timestamp": 1606417617.5628417,
            "transactions": [
                {
                    "batchID": "123",
                    "recipient": "dsbdfsbsd",
                    "sender": "-----BEGIN PUBLIC KEY-----\nMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEFkXrkzf9+BfgJ5fMk58quW1rVWUTuH6/\nVmm/o1EqTrCbTgTipPGgXNfjQXSV+f1qMzBrpA8xTfLaO9cgd9I2tA==\n-----END PUBLIC KEY-----\n",
                    "signature": "MEUCIQCZuvefbZPRSeM0SnLPjaRneqgWUI0n9jA9VzAYd+/+AgIgQBC/T15Hd0k8TKV+rPNdS1i5Sw5IeGKPnzvwiD0Vgv8=",
                    "transaction_input": "2974904f4201f5aad92e2dfb648db7459f6b2a8d58dadeb0dfc92e0fc1fc158b"
                }
            ]
        }
    ]
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
        // this.chain = chain.chain
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

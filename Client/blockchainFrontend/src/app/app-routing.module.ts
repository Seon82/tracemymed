import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletComponent } from './wallet/wallet.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { BlockchainComponent } from './blockchain/blockchain.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'wallet', component: WalletComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'blockchain', component: BlockchainComponent },
  { path: 'about', component: AboutComponent },
  { path: 'enterwallet', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientService } from './http-client.service';
import { WalletComponent } from './wallet/wallet.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { BlockchainComponent } from './blockchain/blockchain.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { EnterWalletComponent } from './enter-wallet/enter-wallet.component';
import { HistoryComponent } from './history/history.component';
import { AdministratorComponent } from './administrator/administrator.component';


@NgModule({
  declarations: [
    AppComponent,
    WalletComponent,
    TransactionsComponent,
    BlockchainComponent,
    AboutComponent,
    HomeComponent,
    EnterWalletComponent,
    HistoryComponent,
    AdministratorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [HttpClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }

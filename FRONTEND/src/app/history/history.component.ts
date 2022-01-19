import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order.model';
import { HistoryService } from '../services/history.service';
import { VariablesGlobales } from '../variablesGlobales';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  history : Order[] = [];

  constructor(private historyService : HistoryService, private param: VariablesGlobales) { }

  ngOnInit(): void {
    this.historyService.getClientHistory(this.param.userConnected.login).subscribe(
      (data) => this.history = data
    );
  }

}

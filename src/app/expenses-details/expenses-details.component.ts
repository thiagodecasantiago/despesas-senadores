import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Despesa } from '../despesa';
import { DespesasSenador } from '../senador';

@Component({
  selector: 'app-expenses-details',
  templateUrl: './expenses-details.component.html',
  styleUrls: ['./expenses-details.component.css'],
})
export class ExpensesDetailsComponent implements OnInit, OnChanges {
  @Input() data: DespesasSenador;
  displayedColumns: string[] = ['type', 'supplier', 'date', 'value'];
  expenses: Despesa[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.data) {
      this.expenses = this.data.despesas;
    }
  }

  sortData(sort: Sort) {
    const data = this.data.despesas.slice();
    if (!sort.active || sort.direction === '') {
      this.expenses = data;
      return;
    }

    this.expenses = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'type':
          return compare(a.tipo, b.tipo, isAsc);
        case 'supplier':
          return compare(a.fornec, b.fornec, isAsc);
        case 'date':
          return compareDate(a, b, isAsc);
        case 'value':
          return compare(a.valor, b.valor, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
function compareDate(a: Despesa, b: Despesa, isAsc: boolean) {
  let result = 0;
  if (a.ano !== b.ano) result = a.ano - b.ano;
  else if (a.mes !== b.mes) result = a.mes - b.mes;
  else if (a.dia !== b.dia) result = a.dia - b.dia;

  return result * (isAsc ? 1 : -1);
}

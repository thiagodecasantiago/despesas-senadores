import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DespesasSenador } from '../senador';

@Component({
  selector: 'app-expenses-summary',
  templateUrl: './expenses-summary.component.html',
  styleUrls: ['./expenses-summary.component.css'],
})
export class ExpensesSummaryComponent implements OnInit, OnChanges {
  @Input() data: DespesasSenador;
  @Input() showDetailsButton: boolean = false;
  displayedColumns: string[] = ['type', 'value'];
  summary: Array<{ type: number; value: number }> = [];
  total: number = 0;

  constructor() {}

  ngOnInit(): void {
    if (this.summary.length === 0) this.initSummaryArray();
  }

  ngOnChanges() {
    if (this.data) {
      if (this.summary.length === 0) this.initSummaryArray();
      this.data.despesas.forEach((despesa) => {
        const typeBucket = this.summary.find(
          (bucket) => bucket.type === despesa.tipo
        );
        typeBucket.value += despesa.valor;
      });

      this.total = this.summary.reduce((acc, curr) => (acc += curr.value), 0);
      // const total = this.summary.reduce((acc, curr) => (acc += curr.value), 0);
      // const totalBucket = this.summary.find((bucket) => bucket.type === 0);
      // totalBucket.value = total;
    }
  }

  initSummaryArray() {
    this.summary = [];
    for (let i = 1; i <= 7; i++) {
      this.summary.push({
        type: i,
        value: 0,
      });
    }
    // this.summary.push({
    //   type: 0,
    //   value: 0,
    // });
  }
}

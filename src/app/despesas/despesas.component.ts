import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DespesasSenador } from '../senador';
import { SenadoresService } from '../senadores.service';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.css'],
})
export class DespesasComponent implements OnInit {
  expensesList: DespesasSenador = null;
  routeID: string;
  resourceID: number;
  isLoading: boolean = true;
  isError: boolean = false;

  constructor(
    public senatorsService: SenadoresService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.routeID = paramMap.get('id');
    });
    this.resourceID = Number(this.routeID);
    if (this.resourceID) {
      this.senatorsService.getDespesasBySenadorID(this.resourceID).subscribe(
        (expenses) => {
          this.expensesList = expenses.id ? expenses : null;
          this.isLoading = false;
        },
        (error) => {
          this.isError = true;
          this.isLoading = false;
        }
      );
    }
  }

  goBack(event?: Event) {
    event.preventDefault();
    this.location.back();
  }
}

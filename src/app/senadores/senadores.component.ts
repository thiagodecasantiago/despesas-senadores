import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DespesasSenador, Senador } from '../senador';
import { SenadoresService } from '../senadores.service';

@Component({
  selector: 'app-senadores',
  templateUrl: './senadores.component.html',
  styleUrls: ['./senadores.component.css'],
})
export class SenadoresComponent implements OnInit {
  senatorList: Senador[] = [];
  senatorName = new FormControl({ name: '' });
  filteredOptions: Observable<Senador[]>;
  senatorData: DespesasSenador;
  isLoading: boolean = true;
  isError: boolean = false;

  constructor(public senatorsService: SenadoresService) {}

  ngOnInit(): void {
    this.senatorsService.getSenadores().subscribe(
      (senators) => {
        this.isLoading = false;
        this.senatorList = senators;
        this.filteredOptions = this.senatorName.valueChanges.pipe(
          startWith(''),
          map((value) =>
            typeof value === 'string' ? value : value.nomeSenador
          ),
          map((name) => (name ? this._filter(name) : this.senatorList.slice()))
        );
      },
      (error) => {
        this.isError = true;
        this.isLoading = false;
      }
    );
    this.senatorName.valueChanges.subscribe((value) => {
      if (value.id) {
        this.isLoading = true;
        this.senatorsService.getDespesasBySenadorID(value.id).subscribe(
          (despesas) => {
            this.senatorData = despesas;
            this.isLoading = false;
          },
          (error) => {
            this.isError = true;
            this.isLoading = false;
          }
        );
      }
    });
  }

  displayFn(senator: Senador): string {
    return senator && senator.nomeSenador ? senator.nomeSenador : '';
  }

  private _filter(name: string): Senador[] {
    const filterValue = name.toLowerCase();

    return this.senatorList.filter((senator) =>
      senator.nomeSenador.toLowerCase().includes(filterValue)
    );
  }
}

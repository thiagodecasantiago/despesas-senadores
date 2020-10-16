import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DespesasSenador, Senador } from './senador';

const URL_BASE = `http://localhost:3000`;

@Injectable({
  providedIn: 'root',
})
export class SenadoresService {
  constructor(private httpClient: HttpClient) {}

  getSenadores() {
    return this.httpClient.get<Senador[]>(`${URL_BASE}/senadores`);
  }

  getAllDespesas() {
    return this.httpClient.get<DespesasSenador[]>(
      `${URL_BASE}/despesasSenadores`
    );
  }

  getDespesasBySenadorID(id: number) {
    return this.httpClient.get<DespesasSenador>(
      `${URL_BASE}/despesasSenadores/${id}`
    );
  }
}

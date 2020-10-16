import { Despesa } from './despesa';

export interface Senador {
  id: number;
  nomeSenador: string;
}

export interface DespesasSenador extends Senador {
  despesas: Despesa[];
}

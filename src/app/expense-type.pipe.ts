import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'expenseType',
})
export class ExpenseTypePipe implements PipeTransform {
  transform(id: number) {
    switch (id) {
      case 0:
        return 'Total';
      case 1:
        return 'Aluguel de imóveis e despesas concernentes a eles';
      case 2:
        return 'Divulgação da atividade parlamentar';
      case 3:
        return 'Aquisição de material de consumo para uso no escritório';
      case 4:
        return 'Passagens aéreas, aquáticas e terrestres nacionais';
      case 5:
        return 'Contratação de consultorias, assessorias, pesquisas, trabalhos técnicos e outros serviços';
      case 6:
        return 'Locomoção, hospedagem, alimentação e combustíveis';
      case 7:
        return 'Serviços de Segurança Privada';
    }
  }
}

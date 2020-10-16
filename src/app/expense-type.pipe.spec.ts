import { ExpenseTypePipe } from './expense-type.pipe';

describe('ExpenseTypePipe', () => {
  it('create an instance', () => {
    const pipe = new ExpenseTypePipe();
    expect(pipe).toBeTruthy();
  });
});

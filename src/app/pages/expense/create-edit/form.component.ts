import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpenseApiService } from '../../../@core/api/expense.resource.service';
import { LayoutService } from '../../../@core/utils';
import { Expense } from '../../../@core/models/Expense';

export abstract class ExpenseFormComponent{
  expense: Expense = new Expense();
  quote: Expense = new Expense();
  form: FormGroup = new FormGroup({});
 
  constructor(
    protected customerApi: ExpenseApiService,
    protected router: Router,
    protected ls: LayoutService
  ) {
    this.form = new FormGroup({
      description: new FormControl(''),
      amount: new FormControl(''),
      note: new FormControl(''),
    });
  }
}

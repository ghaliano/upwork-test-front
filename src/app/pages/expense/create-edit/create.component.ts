import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseApiService } from '../../../@core/api/expense.resource.service';
import { LayoutService } from '../../../@core/utils';
import { Expense } from '../../../@core/models/Expense';

import { ExpenseFormComponent } from './form.component';

@Component({
  selector: 'batiste-expense-create',
  templateUrl: './form.component.html',
})
export class ExpenseCreateComponent extends ExpenseFormComponent {
  constructor(
    expenseApi: ExpenseApiService,
    router: Router,
    ls: LayoutService
  ) {
    super(expenseApi, router, ls);
  }

  ngOnInit(): void {
    this.ls.layoutTitle = "Create new expense";
    this.ls.hasBack = true;
  }

  onSubmit() {
    this.customerApi
      .create(
        this.expense,
        this.form.value,
        { toast: { success: { title: 'Expense' } } },
      )
      .subscribe((expense: Expense) => {
        this.router.navigate([
          '/expenses/list',
        ]);
      });
  }
}

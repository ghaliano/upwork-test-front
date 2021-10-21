import { Component, OnInit } from '@angular/core';
import { ExpenseFormComponent } from './form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseApiService } from '../../../@core/api/expense.resource.service';
import { Expense } from '../../../@core/models/Expense';
import { LayoutService } from '../../../@core/utils';

@Component({
  selector: 'batiste-expense-create',
  templateUrl: './form.component.html',
})
export class ExpenseEditComponent  extends ExpenseFormComponent implements OnInit{   
  constructor(
    expenseApi: ExpenseApiService,
    router: Router,
    ls: LayoutService,
    private route: ActivatedRoute,
  ) {
    super(expenseApi, router, ls);
  }
  
  onSubmit() {
  this.customerApi
    .update(
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

ngOnInit(): void {
  this.ls.layoutTitle = "Edit expense";
  this.ls.hasBack = true;
  this.route.data.subscribe((data: { expense: Expense }) => {
    this.expense = data.expense;
    this.form.patchValue(data.expense);
  });
}
}

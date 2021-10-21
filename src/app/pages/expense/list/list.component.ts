import { Component, ElementRef, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpenseApiService } from '../../../@core/api/expense.resource.service';
import { LayoutService } from '../../../@core/utils';
import { Expense } from '../../../@core/models/Expense';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'batiste-expense-list',
  templateUrl: './list.component.html'
})
export class ExpenseListComponent implements OnInit {
  expenses:Expense[] = [];
  isLoading: boolean = false;
  
  dialogRef: NbDialogRef<any>;
  constructor(
    private route:ActivatedRoute,
    private expenseApi: ExpenseApiService,
    protected dialogService: NbDialogService,
    protected ls: LayoutService) { }

  ngOnInit(): void {
    this.ls.layoutTitle = "Expenses list";
    this.ls.hasBack = false;
    this.fetchExpenses();
  }

  fetchExpenses (filter= {}) {
    this.isLoading = true;
    this.expenseApi.findAll(new Expense, filter).subscribe((expenses: Expense[])=>{
      this.expenses = expenses;
      this.isLoading = false;
    });
  }

  filterExpense($event){
    this.fetchExpenses($event.target.value?{term:$event.target.value}:{});
  }



  removeExpense (expense) {
    if (confirm("Confirmer la suppression")){
      this.expenseApi.delete(expense).subscribe(()=>{
        this.expenses.splice(this.expenses.findIndex(q=>q.id==expense.id), 1);
      });
    }
  }

  showStat(){

  }

  openDialog(dialog: TemplateRef<any>) {
    this.dialogRef = this.dialogService.open(dialog, {
      context: null,
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
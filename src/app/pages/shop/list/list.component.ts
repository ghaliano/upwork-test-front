import { Component, ElementRef, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopApiService } from '../../../@core/api/shop.resource.service';
import { LayoutService } from '../../../@core/utils';
import { Shop } from '../../../@core/models/Shop';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'batiste-shop-list',
  templateUrl: './list.component.html'
})
export class ShopListComponent implements OnInit {
  shops:Shop[] = [];
  isLoading: boolean = false;
  
  dialogRef: NbDialogRef<any>;
  constructor(
    private route:ActivatedRoute,
    private shopApi: ShopApiService,
    protected dialogService: NbDialogService,
    protected ls: LayoutService) { }

  ngOnInit(): void {
    this.ls.layoutTitle = "Shops list";
    this.ls.hasBack = true;
    this.fetchShops();
  }

  fetchShops (filter= {}) {
    this.isLoading = true;
    this.shopApi.findAll(new Shop, filter).subscribe((shops: Shop[])=>{
      this.shops = shops;
      this.isLoading = false;
    });
  }

  filterShop($event){
    this.fetchShops($event.target.value?{term:$event.target.value}:{});
  }



  removeShop (shop) {
    if (confirm("Confirmer la suppression")){
      this.shopApi.delete(shop).subscribe(()=>{
        this.shops.splice(this.shops.findIndex(q=>q.id==shop.id), 1);
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
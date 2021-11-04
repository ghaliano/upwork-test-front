import {Component} from '@angular/core';
import { LayoutService } from 'app/@core/utils/layout.service';

@Component({
  selector: 'batiste-not-found',
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
  
  constructor(
    private ls:LayoutService
  ) {
  }
  
  ngOnInit(): void {
    this.ls.layoutTitle = "Erreur 404";
    this.ls.hasBack = false;
  }
}

import { Injectable } from '@angular/core';

@Injectable()
export class TrackerService {
    progress:number=0;
    show:boolean=false;
    start(){this.show=true;}
    stop(){this.show=false; this.progress = 0;}
}
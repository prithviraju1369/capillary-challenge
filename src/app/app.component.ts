import { Component, OnInit, ViewChild,OnDestroy,HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

declare var PouchDB: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

// App component initilization with OnInit and OnDestroy life cycle callbacks
export class AppComponent implements OnInit,OnDestroy {
  

  constructor(private route: ActivatedRoute,
        private router: Router){
  }
 

  

  // called on component creation
  ngOnInit() {
    let self=this;        
  }
  

  ngOnDestroy(){
  }

  
  
}







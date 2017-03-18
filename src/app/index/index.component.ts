import { Component, OnInit,ViewChild,HostListener  } from '@angular/core';
import { Router } from '@angular/router';
import {UsersService} from './../services/users.service';
import {game} from './../model/sharedmodel';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/startWith';
import * as _ from 'underscore';

@Component({
    selector: 'index',
    templateUrl:'./index.component.html',
    styleUrls: ['./index.component.css'],
    providers:[UsersService]
})
export class IndexComponent implements OnInit {
    games:game[];
    searchCtrl: FormControl;
    filteredSearches: any;
    showFilter:boolean;
    ascendingVal:boolean;
    descendingVal:boolean;
    platform:boolean;
    bkGames:game[];
    @ViewChild('ascending') ascending1;
    @ViewChild('filter') filter;
    @ViewChild('descending') descending1;
    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];
    // redirect to home page
    constructor(private router: Router,private _usersService:UsersService) {
        this.searchCtrl = new FormControl();
        this.filteredSearches = this.searchCtrl.valueChanges
                 .distinctUntilChanged()
                 .switchMap(term => this._usersService.getGames(term)).subscribe(data=>{
                     this.games=data;
                     this.setPage(1);
                     this.resetSortAndFilter();
                 },
                err=>{
                    console.log(err);
                },
                ()=>{
                    console.log('completed');
                });
    }
    
    filterSearch(name:string){
        this.getGames(name);
    }

    ngOnInit() {
        this.getGames();
    }

    getGames(name?){
        this._usersService.getGames(name).subscribe(data=>{
            this.games=data;
            this.setPage(1);
        },
        err=>{
            console.log(err);
        },
        ()=>{
            console.log('completed');
        });
    }

    ascendingFun(){
        this.ascendingVal=true;
        this.descendingVal=false;
        this.ascending1.nativeElement.style.background='#3f51b5';
        this.ascending1.nativeElement.style.color='#3f51b5';
        this.descending1.nativeElement.style.background='yellow';
        this.descending1.nativeElement.style.background='yellow';
        this.games=this.sortFunctionality("score");
        this.setPage(1);
    }
    resetSortAndFilter(){
        this.ascendingVal=false;
        this.descendingVal=false;
        this.platform=false;
        this.ascending1.nativeElement.style.background='yellow';
        this.ascending1.nativeElement.style.color='yellow';
        this.descending1.nativeElement.style.background='yellow';
        this.descending1.nativeElement.style.background='yellow';
    }
    sortFunctionality(val){
        let games:game[]=this.games.sort( function(name1, name2) {
            if ( name1[val] < name2[val] ){
                return -1;
            }else if( name1[val] > name2[val] ){
                return 1;
            }else{
                return 0;	
            }
        });
        return games;
    }
    descendingFun(){
        this.ascendingVal=false;
        this.descendingVal=true;
        this.descending1.nativeElement.style.background='#3f51b5';
        this.descending1.nativeElement.style.color='#3f51b5';
        this.ascending1.nativeElement.style.background='yellow';
        this.ascending1.nativeElement.style.background='yellow';
        this.games=this.sortFunctionality("score").reverse();
        this.setPage(1);
    }

    filterClick(ele){
        let val=this.filter.nativeElement.style.display;
        if(val=='flex'){
            this.filter.nativeElement.style.display='none';
        }else{
            this.filter.nativeElement.style.display='flex';
        }
            
            if(this.ascendingVal){
                if(this.ascending1){
                    this.ascending1.nativeElement.style.background='#3f51b5';
                    this.ascending1.nativeElement.style.color='#3f51b5';
                }
            }
            if(this.descendingVal){
                if(this.descending1){
                    this.descending1.nativeElement.style.background='#3f51b5';
                    this.descending1.nativeElement.style.color='#3f51b5';
                }
            }
    }

    sortPlatform(){
        if(this.platform===true || !this.platform){
            this.bkGames=JSON.parse(JSON.stringify(this.games));
            this.games=this.sortFunctionality("platform");
        }else{
            this.games=this.bkGames;
        }
        this.setPage(1);
    }  
    
    setPage(page: number) {
        

        this.pager = this.getPager(this.games.length, page);
        this.pagedItems = this.games.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
        let totalPages = Math.ceil(totalItems / pageSize);

        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        let pages = _.range(startPage, endPage + 1);

        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

};
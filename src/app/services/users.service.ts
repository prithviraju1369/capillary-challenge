import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { user } from './../model/sharedmodel';

// Import RxJs required methods
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

@Injectable()
export class UsersService{
    
     private games = '/games';
    constructor(private http:Http){
    }
    
    getGames(name:string){
        let params: URLSearchParams = new URLSearchParams();
        params.set('val', name);

        let requestOptions = new RequestOptions();
        requestOptions.search = params;

       return this.http.get(this.games,requestOptions).map((res:Response) => res.json())
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    
    
}
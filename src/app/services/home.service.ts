import { Injectable } from '@angular/core';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class HomeService{
    http:any;
    baseUrl:String;
    token: any;

    constructor(http:Http){
        this.http = http;
        this.baseUrl = 'http://ionicos.herokuapp.com/';
    }

    getEmail(email){
        let h= new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
                
        let options = new RequestOptions({ headers: h });

        console.log("https://spneauth.herokuapp.com/mail/"+email)
        
        this.http.get("https://spneauth.herokuapp.com/mail/"+email, options)
            .map((res:Response) => res)
            .subscribe(data => { console.log(data); })
            
    }

    getTel(tel){
        let h= new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
                
        let options = new RequestOptions({ headers: h });

        console.log("https://spneauth.herokuapp.com/msg/"+tel)

        return this.http.get("https://spneauth.herokuapp.com/msg/"+tel, options)
            .map(res => res)
            .subscribe(data => { console.log(data); })
    }

    getPosts(key, token){
        let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers.append('Accept', 'application/json');
            headers.append('Authorization', 'Bearer ' + token);

        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl+"users/index/"+key, options)
            .map(res => res.json());
    }

    getURL(){
        return this.baseUrl;
    }

    getToken(key){
        let headers = new Headers(
            {
              'Content-Type' : 'application/json'
            });
            let options = new RequestOptions({ headers: headers });
            
            let data = JSON.stringify({
              pin: key
            });

            return this.http.post(this.baseUrl+'auth/login', data, options)
                            .map(res => res.json());
    }
}
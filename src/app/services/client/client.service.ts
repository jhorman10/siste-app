import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_USERS } from 'src/app/constants';
import { User } from 'src/app/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]>{
   return this.http.get<User[]>(`${URL_USERS}`);
  }
}

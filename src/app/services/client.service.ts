import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_USERS } from '../constants';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]>{
   return this.http.get<User[]>(`${URL_USERS}`);
  }
}

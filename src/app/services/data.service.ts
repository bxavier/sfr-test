import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IClient } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  api = 'http://localhost:3000/clients';

  constructor(private http: HttpClient) {}

  postClient(object: IClient): Observable<IClient> {
    return this.http.post<IClient>(this.api, object);
  }

  getClientById(id: number): Observable<IClient> {
    return this.http.get<IClient>(this.api, { params: { id } });
  }

  getAllClients(): Observable<IClient[]> {
    return this.http.get<IClient[]>(this.api);
  }

  updateClient(object: IClient): Observable<IClient> {
    return this.http.put<IClient>(`${this.api}/${object.id}`, object);
  }

  deleteClient(id: number): Observable<IClient> {
    return this.http.delete<IClient>(`${this.api}/${id}`);
  }
}

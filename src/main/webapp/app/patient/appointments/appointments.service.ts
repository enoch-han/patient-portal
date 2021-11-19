import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from './appointments.model';
// import { createRequestOption } from '../../core/request/request-util';

@Injectable()
export class AppointmentsService {
  private resourceUrl = 'api/appointments';

  constructor(private http: HttpClient) {}

  create(appointment: Appointment): Observable<Appointment> {
    const copy = this.convert(appointment);
    return this.http.post(this.resourceUrl, copy);
  }
  getAppointments(): Observable<Appointment[]> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.http.get<Appointment[]>(this.resourceUrl);
  }

  private convert(appointment: Appointment): Appointment {
    const copy: Appointment = Object.assign({}, appointment);
    return copy;
  }
}

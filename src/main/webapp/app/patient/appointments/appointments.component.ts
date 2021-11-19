import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { AccountService } from '../../core/auth/account.service';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { Appointment } from './appointments.model';
import { AppointmentsService } from './appointments.service';

@Component({
  selector: 'jhi-patient-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.css'],
})
export class AppointmentsComponent implements OnInit, OnDestroy {
  appointments!: Appointment[];
  currentAccount: any;
  eventSubscriber!: Subscription;

  constructor(
    private appointmentService: AppointmentsService,
    private eventManager: JhiEventManager,
    private alertService: JhiAlertService,
    private principal: AccountService
  ) {}

  loadAll(): void {
    this.appointmentService.getAppointments().subscribe(
      (res: Appointment[]) => {
        this.appointments = res;
      },
      (res: Error) => this.onError(res)
    );
  }
  ngOnInit(): void {
    this.loadAll();
    this.currentAccount = this.principal.identity();
    this.registerChangeInAppointments();
  }

  ngOnDestroy(): void {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: Appointment): number | undefined {
    return item.id;
  }
  registerChangeInAppointments(): void {
    this.eventSubscriber = this.eventManager.subscribe('appointmentListModification', () => this.loadAll());
  }

  private onError(error: any): void {
    this.alertService.error(error.message, null, '');
  }
}

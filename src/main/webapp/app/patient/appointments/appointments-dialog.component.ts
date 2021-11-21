import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Appointment } from './appointments.model';
import { AppointmentsPopupService } from './appointments-popup.service';
import { AppointmentsService } from './appointments.service';

@Component({
  selector: 'jhi-appointments-dialog',
  templateUrl: './appointments-dialog.component.html',
})
export class AppointmentsDialogComponent implements OnInit {
  appointment!: Appointment;
  isSaving!: boolean;

  constructor(
    public activeModal: NgbActiveModal,
    private alertService: JhiAlertService,
    private appointmentsService: AppointmentsService,
    private eventManager: JhiEventManager
  ) {}

  ngOnInit(): void {
    this.isSaving = false;
  }

  clear(): void {
    this.activeModal.dismiss('cancel');
  }

  save(): void {
    this.isSaving = true;
    this.subscribeToSaveResponse(this.appointmentsService.create(this.appointment));
  }

  private subscribeToSaveResponse(result: Observable<Appointment>): void {
    result.subscribe(
      (res: Appointment) => this.onSaveSuccess(res),
      (res: Response) => this.onSaveError(res)
    );
  }

  private onSaveSuccess(result: Appointment): void {
    this.eventManager.broadcast({ name: 'appointmentListModification', content: 'OK' });
    this.isSaving = false;
    this.activeModal.dismiss(result);
    this.alertService.success('created new appointment');
  }

  private onSaveError(error: any): void {
    try {
      error.json();
    } catch (exception) {
      error.message = error.text();
    }
    this.isSaving = false;
    this.onError(error);
  }

  private onError(error: Error): void {
    this.alertService.error(error.message, null, '');
  }
}

@Component({
  selector: 'jhi-appointments-popup',
  template: '',
})
export class AppointmentsPopupComponent implements OnInit, OnDestroy {
  routeSub: any;

  constructor(private route: ActivatedRoute, private appointmentsPopupService: AppointmentsPopupService) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(() => {
      this.appointmentsPopupService.open(AppointmentsDialogComponent as Component);
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}

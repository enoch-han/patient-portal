import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppointmentsComponent } from './appointments.component';
import { appointmentsPopupRoute, appointmentsRoute } from './appointments.route';
import { AppointmentsDialogComponent, AppointmentsPopupComponent } from './appointments-dialog.component';
import { AppointmentsService } from './appointments.service';
import { AppointmentsPopupService } from './appointments-popup.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngb-modal';
import { CommonModule } from '@angular/common';

const ENTITY_STATES = [...appointmentsRoute, ...appointmentsPopupRoute];

@NgModule({
  imports: [RouterModule.forChild(ENTITY_STATES), FormsModule, CommonModule, ReactiveFormsModule, HttpClientModule, ModalModule],
  declarations: [AppointmentsComponent, AppointmentsDialogComponent, AppointmentsPopupComponent],
  entryComponents: [AppointmentsComponent, AppointmentsDialogComponent, AppointmentsPopupComponent],
  providers: [AppointmentsService, AppointmentsPopupService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PatientPortalAppointmentsModule {}

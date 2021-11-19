import { Authority } from './../../config/authority.constants';
import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../core/auth/user-route-access.service';
import { AppointmentsComponent } from './appointments.component';
import { AppointmentsPopupComponent } from './appointments-dialog.component';

export const appointmentsRoute: Routes = [
  {
    path: 'patient-appointments',
    component: AppointmentsComponent,
    data: {
      authorities: [Authority.PATIENT],
      pageTitle: 'Appointments',
    },
    canActivate: [UserRouteAccessService],
  },
];

export const appointmentsPopupRoute: Routes = [
  {
    path: 'patient-appointments-new',
    component: AppointmentsPopupComponent,
    data: {
      authorities: [Authority.PATIENT],
      pageTitle: 'Appointments',
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup',
  },
];

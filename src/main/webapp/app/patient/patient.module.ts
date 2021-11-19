import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PatientPortalAppointmentsModule } from './appointments/appointments.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [HttpClientModule, PatientPortalAppointmentsModule, FormsModule],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PatientPortalPatientModule {}

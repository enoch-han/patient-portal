package com.company.patientportal.web.rest;

import com.company.patientportal.domain.Appointment;
import com.company.patientportal.service.AppointmentService;
import com.company.patientportal.service.UserService;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.jhipster.web.util.HeaderUtil;

/**
 * REST Controller for managing appointments
 */
@RestController
@RequestMapping("/api")
public class AppointmentResource {

    private final Logger log = LoggerFactory.getLogger(AppointmentResource.class);

    private static final String ENTITY_NAME = "appointment";

    private final AppointmentService appointmentService;
    private final UserService userService;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    public AppointmentResource(AppointmentService appointmentService, UserService userService) {
        this.appointmentService = appointmentService;
        this.userService = userService;
    }

    /**
     * GET  /appointments : get all the appointments.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of appointments in body
     */
    @GetMapping("/appointments")
    public List<Appointment> getAllAppointments() {
        log.debug("REST request to get all Appointments");
        return appointmentService.findAllByUser(userService.getUserWithAuthorities().get().getId());
    }

    /**
     * POST  /appointments : Create a new appointment.
     *
     * @param appointment the appointment to create
     * @return the ResponseEntity with status 201 (Created) and with body the new appointment, or with status 400 (Bad Request) if the appointment has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/appointments")
    public ResponseEntity<Appointment> createAppointment(@Valid @RequestBody Appointment appointment) throws URISyntaxException {
        log.debug("REST request to save Appointment : {}", appointment);
        if (appointment.getId() != null) {
            return ResponseEntity
                .badRequest()
                .headers(
                    HeaderUtil.createFailureAlert(
                        applicationName,
                        true,
                        ENTITY_NAME,
                        "idexists",
                        "A new appointment cannot already have an ID"
                    )
                )
                .body(null);
        }
        appointment.setUserId(userService.getUserWithAuthorities().get().getId());
        Appointment result = appointmentService.save(appointment);
        return ResponseEntity
            .created(new URI("/api/appointments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }
}

package com.company.patientportal.cucumber;

import com.company.patientportal.PatientportalApp;
import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.web.WebAppConfiguration;

@CucumberContextConfiguration
@SpringBootTest(classes = PatientportalApp.class)
@WebAppConfiguration
public class CucumberTestContextConfiguration {}

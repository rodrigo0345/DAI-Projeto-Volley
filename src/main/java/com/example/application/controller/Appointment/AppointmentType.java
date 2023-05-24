package com.example.application.controller.Appointment;

import com.example.application.model.Appointments.PhysicalAppointment;
import com.example.application.model.Appointments.PsychologicalAppointment;
import com.example.application.model.Appointments.TechnicalAppointment;

public class AppointmentType implements Comparable<AppointmentType>{

    public PhysicalAppointment physicalAppointment;
    public TechnicalAppointment technicalAppointment;
    public PsychologicalAppointment psychologicalAppointment;

    public AppointmentType() {}
    
    public AppointmentSavedType getType() {
        if (physicalAppointment != null) return AppointmentSavedType.PHYSICAL;
        else if (technicalAppointment != null) return AppointmentSavedType.TECHNICAL;
        else if (psychologicalAppointment != null) return AppointmentSavedType.PSYCHOLOGICAL;
        return null;
    }

    public <T> T returnType() {
        if (physicalAppointment != null) return (T) physicalAppointment;
        else if (technicalAppointment != null) return (T) technicalAppointment;
        else if (psychologicalAppointment != null) return (T) psychologicalAppointment;
        return null;
    }

    @Override
    public int compareTo(AppointmentType arg0) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'compareTo'");
    }
    
}

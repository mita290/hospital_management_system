-- Check all patients xxxxxxxxxxxxxxxxxxxxxxxxxxxx
SELECT * FROM patient;

-- Check all doctors xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SELECT * FROM doctor;

-- Check all staff xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SELECT * FROM staff;

-- Check all appointments and their relationships xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SELECT * FROM appointment
JOIN patient ON appointment.PatientID = patient.PatientID
JOIN doctor ON appointment.DoctorID = doctor.DoctorID
JOIN staff ON  appointment.StaffID = staff.StaffID; 

-- Check all billing records and their relationships xxxxxxxxxxxxxxxxxxxxxxxxxx
SELECT * FROM billing
JOIN appointment ON billing.AppointmentID = appointment.AppointmentID
JOIN patient ON billing.PatientID = patient.PatientID
JOIN doctor ON billing.DoctorID = doctor.DoctorID;

-- Check medical history records xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SELECT * FROM medicalhistory
JOIN patient ON medicalhistory.PatientID = patient.PatientID;

-- Check prescription records xxxxxxxxxxxxxxxxxxxxxxxxxxx
SELECT * FROM prescription
JOIN patient ON prescription.PatientID = patient.PatientID
JOIN doctor ON prescription.DoctorID = doctor.DoctorID;

-- Check equipment records and their relationships xxxxxxxxxxxxxxxxxxxxxxxxx
SELECT * FROM equipment
JOIN staff ON equipment.StaffID = staff.StaffID;

-- Check room records and their relationships xxxxxxxxxxxxxxxxxxxxx
SELECT * FROM room
LEFT JOIN patient ON room.AssignedPatientID = patient.PatientID;

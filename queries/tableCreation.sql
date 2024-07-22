create table patient (
	PatientID text primary key default generate_patient_id(),
	Name varchar(100) not null,
	DOB date not null,
	Gender varchar(10),
	ContactInformation JSONB
);

CREATE TABLE doctor (
    DoctorID TEXT PRIMARY KEY DEFAULT generate_doctor_id(),
    Name VARCHAR(100) NOT NULL,
    DateOfBirth DATE NOT NULL,
    University VARCHAR(100),
    Experience INT,
    PhoneNumber VARCHAR(15),
    Email VARCHAR(100),
    Address VARCHAR(255),
    AssignedRole VARCHAR(50),
    AvailabilityStatus BOOLEAN DEFAULT TRUE
);


CREATE TABLE staff (
    StaffID TEXT PRIMARY KEY DEFAULT generate_staff_id(),
    Name VARCHAR(100) NOT NULL,
    Username VARCHAR(50) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    ContactInformation JSONB,
    Role VARCHAR(50)
);

CREATE TABLE appointment (
    AppointmentID TEXT PRIMARY KEY default generate_appointment_id(),
    PatientID TEXT NOT NULL,
    DoctorID TEXT NOT NULL,
	StaffID TEXT NOT NULL,
    AppointmentDate DATE NOT NULL,
    AppointmentTime TIME NOT NULL,
    ReasonForAppointment TEXT,
    Status VARCHAR(20) DEFAULT 'SCHEDULED',
    FOREIGN KEY (PatientID) REFERENCES patient(PatientID),
    FOREIGN KEY (DoctorID) REFERENCES doctor(DoctorID),
    FOREIGN KEY (StaffID) REFERENCES staff(StaffID)
);

CREATE TABLE billing (
    BillingID TEXT PRIMARY KEY default generate_bill_id(),
    AppointmentID TEXT NOT NULL,
    PatientID TEXT NOT NULL,
    DoctorID TEXT NOT NULL,
    ConsultationFee DECIMAL(10, 2),
    AdditionalCosts DECIMAL(10, 2),
    TotalAmount DECIMAL(10, 2) GENERATED ALWAYS AS (ConsultationFee + AdditionalCosts) STORED,
    BillingDate DATE NOT NULL,
    PaymentStatus VARCHAR(20) DEFAULT 'UNPAID',
    FOREIGN KEY (AppointmentID) REFERENCES appointment(AppointmentID),
    FOREIGN KEY (PatientID) REFERENCES patient(PatientID),
    FOREIGN KEY (DoctorID) REFERENCES doctor(DoctorID)
);

CREATE TABLE medicalhistory (
    MedicalHistoryID TEXT PRIMARY KEY default generate_medicalhistory_id(),
    PatientID TEXT NOT NULL,
    Date DATE NOT NULL,
    Details TEXT,
    FOREIGN KEY (PatientID) REFERENCES patient(PatientID)
);

CREATE TABLE prescription (
    PrescriptionID TEXT PRIMARY KEY default generate_prescription_id(),
    PatientID TEXT NOT NULL,
    DoctorID TEXT NOT NULL,
    Date DATE NOT NULL,
    MedicationDetails TEXT,
    FOREIGN KEY (PatientID) REFERENCES patient(PatientID),
    FOREIGN KEY (DoctorID) REFERENCES doctor(DoctorID)
);

CREATE TABLE equipment (
    EquipmentID TEXT PRIMARY KEY default generate_equipment_id(),
    Type VARCHAR(50) NOT NULL,
    Quantity INT NOT NULL,
    Status VARCHAR(20) DEFAULT 'AVAILABLE',
    LastCheckedDate DATE,
    StaffID TEXT,
    FOREIGN KEY (StaffID) REFERENCES staff(StaffID)
);

CREATE TABLE room (
    RoomID TEXT PRIMARY KEY default generate_room_id(),
    Type VARCHAR(50) NOT NULL,
    Status VARCHAR(20) DEFAULT 'AVAILABLE',
    AssignedPatientID TEXT,
    FOREIGN KEY (AssignedPatientID) REFERENCES patient(PatientID)
);

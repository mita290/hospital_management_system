# Hospital Management System Documentation

## Project Overview
This project is a Hospital Management System designed to manage various aspects of hospital operations such as patient management, doctor and staff management, appointment scheduling, billing, and equipment management. It was developed as a mini-project during my second year of college.

## Tech Stack
**Backend**: NodeJS, Express <br />
**Frontend**: EJS templates <br />
**Database**: PostgreSQL <br />
**Other Libraries**: <br />
  *bcrypt* for password hashing <br />
  *body-parser* for parsing request bodies <br />
  *dotenv* for environment variables <br />
  *express-session* for session management <br />
  *canvas.js* for generating graphs <br />

## Installation and Setup
1) Clone the repository:
```git clone https://github.com/mita290/hospital_management_system.git```

2) Navigate to the project directory:
```cd hospitalmanagementsystem```

3) Install dependencies:
```npm install```

4) Set up environment variables in a .env file:
```
DB_HOST=<your_database_host>
DB_USER=<your_database_user>
DB_PASSWORD=<your_database_password>
DB_NAME=<your_database_name>
SESSION_SECRET=<your_session_secret>
```

5) Queries for the creation of tables, functions and sequences can be accessed using this url: ```https://github.com/mita290/hospital_management_system/tree/master/queries```<br />
6) Run the application:
```npm start```

## Usage Instructions

Navigate to ```http://localhost:3000``` in your web browser. <br />
Login using the credentials provided (default admin credentials can be set up in the database).

## Entities and Relationships

### ER Model
(url)

## Database Schema

* ### Patients <br />
PatientID (Primary Key) <br />
Name <br />
DateOfBirth <br />
Gender <br />
ContactInformation (Phone, Email, Address) <br />
* ### Doctors <br />
DoctorID (Primary Key)<br />
Name <br />
DateOfBirth <br />
University <br />
Experience <br />
PhoneNumber <br />
Email <br />
Address <br />
AssignedRole (e.g., General Surgeon, Cardiothoracic Surgeon) <br />
AvailabilityStatus <br />
* ### Appointments <br />
AppointmentID (Primary Key) <br />
PatientID (Foreign Key) <br />
DoctorID (Foreign Key) <br />
AppointmentDate <br />
AppointmentTime <br />
ReasonForAppointment <br />
Status (Scheduled, Completed, Cancelled) <br />
StaffID (Foreign Key – they booked the appointment) <br />
* ### Billing <br />
BillingID (Primary Key) <br />
AppointmentID (Foreign Key) <br />
PatientID (Foreign Key) <br />
DoctorID (Foreign Key) <br />
ConsultationFee <br />
AdditionalCosts (Syringes, Medicines, etc.) <br />
TotalAmount <br />
BillingDate <br />
PaymentStatus (Paid, Unpaid)<br />
* ### MedicalHistory<br />
MedicalHistoryID (Primary Key) <br />
PatientID (Foreign Key) <br />
Date <br />
Details (Diagnosis, Treatments, etc.) <br />
* ### Prescriptions <br />
PrescriptionID (Primary Key) <br />
PatientID (Foreign Key) <br />
DoctorID (Foreign Key) <br />
Date <br />
MedicationDetails<br />
* ### Equipment <br />
EquipmentID (Primary Key) <br />
Type (e.g., Bed, Oxygen Cylinder, Defibrillator) <br />
Quantity <br />
Status (Available, In Use, Maintenance) <br />
LastCheckedDate <br />
StaffID (Foreign Key) <br />
* ### Rooms <br />
RoomID (Primary Key) <br />
Type (e.g., Single, Double, ICU) <br />
Status (Available, Occupied, Maintenance) <br />
AssignedPatientID (Foreign Key, nullable) <br />
AssignedDoctorID (Foreign Key, nullable) <br />
* ### Staff <br />
StaffID (Primary Key)<br />
Name <br />
Username <br />
Password (Hashed) <br />
ContactInformation (Phone, Email) <br />
* ## Relationships
* **Patients to Appointments**: One-to-Many <br />
* **Doctors to Appointments**: One-to-Many <br />
* **Appointments to Billing**: One-to-One <br />
* **Patients to Billing**: One-to-Many <br />
* **Patients to MedicalHistory**: One-to-Many <br />
* **Patients to Prescriptions**: One-to-Many <br />
* **Doctors to Prescriptions**: One-to-Many <br />
* **Patients to Rooms**: One-to-One <br />
* **Appointments to Prescriptions**: One-to-One <br />
* **Doctors to Rooms**: Many-to-Many <br />
* **Equipment to Staff**: Many-to-One <br />
* **Staff to Appointment**: One-to-Many <br />

## Features

* Staff registration and login (with session management and password hashing)
* Add, update, delete patient records
* View list of doctors and staff
* View patient medical history and prescriptions
* Book, update, and delete appointments, categorized by status (scheduled, completed, cancelled)
* Calculate and manage billing (paid and unpaid)
* Add, update, and delete equipment, with availability graphs generated using Canvas.js
* Add, update, and delete rooms, indicating occupied and available rooms
* Dashboard displaying time, available doctors, upcoming appointments, with navigation via a vertical sidebar

## Screenshots
* # Home Page
* # Login/Registration page
* # Dashboard
* # Patient management page
* # Doctor management page
* # Appointment scheduling page
* # Billing page
* # Equipment management page
* # Room management page

## Future Enhancements
* Develop a module where doctors can update their availability status.
* Create an administrator page where new doctors and staff can be registered.
* Send appointment details to patients' email IDs when appointments are booked.

## Contributing
* Fork the repository.
* Create a new branch (```git checkout -b feature-branch```).
* Make your changes and commit them (```git commit -m 'Add some feature'```).
* Push to the branch (```git push origin feature-branch```).
* Open a pull request.

## License
This project is licensed under the ISC License - see the LICENSE file for details.

## Contact Information
For any inquiries, please contact:

**Name**: Manjushree Magesh
**Email**: mageshmanjushree290@gmail.com
**GitHub**: mita290

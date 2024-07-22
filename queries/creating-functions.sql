create or replace function generate_patient_id() returns text as $$
begin
	return 'P' || LPAD(nextval('patient_id_seq')::text, 3, '0');
end;
$$ language plpgsql;

create or replace function generate_doctor_id() returns text as $$
begin
	return 'D' || LPAD(nextval('doctor_id_seq')::text, 3, '0');
end;
$$ language plpgsql;

create or replace function generate_staff_id() returns text as $$
begin
	return 'D' || LPAD(nextval('staff_id_seq')::text, 3, '0');
end;
$$ language plpgsql;

create or replace function generate_appointment_id() returns text as $$
begin
	return 'A' || LPAD(nextval('appointment_id_seq')::text, 3, '0');
end;
$$ language plpgsql;

create or replace function generate_room_id() returns text as $$
begin
	return 'R' || LPAD(nextval('room_id_seq')::text, 3, '0');
end;
$$ language plpgsql;

create or replace function generate_bill_id() returns text as $$
begin
	return 'B' || LPAD(nextval('bill_id_seq')::text, 3, '0');
end;
$$ language plpgsql;

create or replace function generate_medicalhistory_id() returns text as $$
begin
	return 'M' || LPAD(nextval('medicalhistory_id_seq')::text, 3, '0');
end;
$$ language plpgsql;

create or replace function generate_prescription_id() returns text as $$
begin
	return 'T' || LPAD(nextval('prescription_id_seq')::text, 3, '0');
end;
$$ language plpgsql;

create or replace function generate_equipment_id() returns text as $$
begin
	return 'E' || LPAD(nextval('equipment_id_seq')::text, 3, '0');
end;
$$ language plpgsql;
import express from 'express';
import db from '../../db.js'; 
import { isAuthenticated } from "../../middleware/auth.js";

const router = express.Router();

router.get('/dashboard', isAuthenticated, async (req, res) => {
    try {
        const doctorResult = await db.query("SELECT doctorid, name, assignedrole FROM doctor WHERE availabilitystatus = true");
        const patientResult = await db.query("SELECT  p.name, a.patientid, a.appointmentid, a.appointmenttime, a.status FROM appointment a join patient p on p.patientid = a.patientid WHERE status = 'SCHEDULED'");
        let doctordata = (doctorResult.rows.length) != 0 ? doctorResult.rows : "Not Available";
        let patientdata = (patientResult.rows.length) != 0 ? patientResult.rows : "No Upcoming Appointments";
        res.render('dashboard.ejs', { doctordata: doctordata, patientdata: patientdata});
    } catch (err) {
        console.log(err);
    }
});

export default router;
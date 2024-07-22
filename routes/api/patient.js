import express from 'express';
import db from '../../db.js'; 
import { isAuthenticated } from "../../middleware/auth.js";

const router = express.Router();

router.get("/patient", isAuthenticated, async (req, res) => {
    try {
        const patientResult = await db.query("SELECT patientid, name, dob, gender, contactinformation->>'Phone' as phone, contactinformation->>'email' as email, contactinformation->>'address' as address FROM patient ORDER BY patientid asc");
        let patientdata = (patientResult.rows.length > 0) ? patientResult.rows : "No Data Available";

        if (Array.isArray(patientdata)) {
            patientdata = patientdata.map(patient => {
                if (patient.dob) {
                    let birthDate = new Date(patient.dob);
                    let day = birthDate.getDate();
                    let month = birthDate.getMonth() + 1; // getMonth() returns month from 0-11, so add 1
                    let year = birthDate.getFullYear();

                    // Add leading zero to day and month if needed
                    if (day < 10) {
                        day = '0' + day;
                    }
                    if (month < 10) {
                        month = '0' + month;
                    }

                    // Format the date as dd-mm-yyyy
                    patient.dob = `${day}-${month}-${year}`;
                }
                return patient;
            });
        }

        res.render('patient.ejs', { patientdata: patientdata });
    } catch (err) {
        console.log(err);
    }
});

export default router;

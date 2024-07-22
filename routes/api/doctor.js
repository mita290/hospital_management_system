import express from 'express';
import db from '../../db.js'; 
import { isAuthenticated } from "../../middleware/auth.js";

const router = express.Router();

router.get("/doctor", isAuthenticated, async (req, res) => {
    try {
        const doctorResult = await db.query("SELECT doctorid, name, dateofbirth, gender, phonenumber, email, address, university, experience, assignedrole, availabilitystatus FROM doctor ORDER BY doctorid asc");
        let doctordata = (doctorResult.rows.length > 0) ? doctorResult.rows : "No Data Available";

        if (Array.isArray(doctordata)) {
            doctordata = doctordata.map(doctor => {
                if (doctor.dateofbirth) {
                    let birthDate = new Date(doctor.dateofbirth);
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
                    doctor.dateofbirth = `${day}-${month}-${year}`;
                }
                return doctor;
            });
        }

        res.render('doctor.ejs', { doctordata: doctordata });
    } catch (err) {
        console.log(err);
    }
});

export default router;

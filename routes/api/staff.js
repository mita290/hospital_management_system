import express from 'express';
import db from '../../db.js';
import { isAuthenticated } from "../../middleware/auth.js";

const router = express.Router();

router.get("/staff", isAuthenticated, async (req, res) => {
    try {
        const result = await db.query("SELECT staffid, name, dob, gender, role, datejoined, contactinformation->>'Phone' as phone, contactinformation->>'Email' as email, contactinformation->>'Address' as address from staff order by staffid asc");
        let staffdata = (result.rows.length > 0) ? result.rows : "No Data Available";
        if (Array.isArray(staffdata)) {
            staffdata = staffdata.map((staff) => {
                if (staff.dob) {
                    let birthDate = new Date(staff.dob);
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
                    staff.dob = `${day}-${month}-${year}`;
                }
                if (staff.datejoined) {
                    let birthDate = new Date(staff.datejoined);
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
                    staff.datejoined = `${day}-${month}-${year}`;
                }
                return staff;
            });
            res.render('staff.ejs', { staffdata: staffdata });
        }
    } catch (err) {
        console.log(err)
    }
});

export default router;
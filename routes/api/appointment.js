import express from 'express';
import db from '../../db.js'; 
import { isAuthenticated } from "../../middleware/auth.js";

const router = express.Router();

router.get("/appointment", isAuthenticated, async (req, res) => {
    try {
        const result = await db.query(`select a.appointmentid, p.name as patientname, d.name as doctorname, s.name as staffname, 
            a.appointmentdate, a.appointmenttime, a.reasonforappointment, a.status 
            from appointment a 
            join patient p on a.patientid=p.patientid 
            join doctor d on a.doctorid=d.doctorid 
            join staff s on a.staffid=s.staffid 
            order by a.appointmentdate, a.appointmenttime asc`
        );
        if (result.rows.length != 0) {

            if (Array.isArray(result.rows)) {
                result.rows = result.rows.map(r => {
                    if (r.appointmentdate) {
                        let appointmentdate = new Date(r.appointmentdate);
                        let day = appointmentdate.getDate();
                        let month = appointmentdate.getMonth() + 1; 
                        let year = appointmentdate.getFullYear();
                        let word = appointmentdate.getDay();
                        if (day < 10) {
                            day = '0' + day;
                        }
                        if (month < 10) {
                            month = '0' + month;
                        }
                        const arr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                        r.appointmentdate = `${day}-${month}-${year}, ${arr[word]}`;
                    }
                    return r;
                });
            }
            let scheduledAppointments = result.rows.filter((a) => a.status === 'SCHEDULED') || "No Data Available";
            let completedAppointments = result.rows.filter((a) => a.status === 'COMPLETED') || "No Data Available";
            let cancelledAppointments = result.rows.filter((a) => a.status === 'CANCELLED') || "No Data Available";
            //console.log(result.rows[0].appointmentdate);
            res.render('appointment.ejs', { 
                scheduledAppointments: scheduledAppointments, 
                completedAppointments: completedAppointments, 
                cancelledAppointments: cancelledAppointments 
            });
        } else {
            res.render("appointment.ejs", { text: "No Data Available"});
        }
    } catch (err) {
        console.log(err);
    }
});

export default router;
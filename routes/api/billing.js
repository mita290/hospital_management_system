import express from 'express';
import db from '../../db.js'; 
import { isAuthenticated } from "../../middleware/auth.js";

const router = express.Router();

router.get("/billing", isAuthenticated, async (req, res) => {
    try {
        const result  = await db.query(`select b.billingid, a.appointmentid, p.name as patientname, d.name as doctorname, 
            b.consultationfee, b.additionalcosts, b.totalamount, b.billingdate, b.paymentstatus, a.appointmenttime from billing b 
            join appointment a on a.appointmentid=b.appointmentid join patient p on p.patientid=b.patientid join doctor d 
            on d.doctorid=b.doctorid where a.status='COMPLETED' order by b.billingid asc;`);
        if (result.rows.length != 0) {
            if (Array.isArray(result.rows)) {
                result.rows = result.rows.map(r => {
                    if (r.billingdate) {
                        let billingdate = new Date(r.billingdate);
                        let day = billingdate.getDate();
                        let month = billingdate.getMonth() + 1; 
                        let year = billingdate.getFullYear();
                        let word = billingdate.getDay();
                        if (day < 10) {
                            day = '0' + day;
                        }
                        if (month < 10) {
                            month = '0' + month;
                        }
                        const arr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                        r.billingdate = `${day}-${month}-${year}, ${arr[word]}`;
                    }
                    return r;
                });
            }
            let billingdata = result.rows;
            res.render('billing.ejs', { billingdata: billingdata });
        } else {
            res.render("billing.ejs", { text: "No Data Available" });
        }
    } catch (err) {
        console.log(err);
    }
});

export default router;
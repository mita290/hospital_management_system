import express from 'express';
import db from '../../db.js'; 
import { isAuthenticated } from "../../middleware/auth.js";

const router = express.Router();

//add appointment

router.get("/appointment", isAuthenticated, (req, res) => {
    res.render("addappointment.ejs");
});

router.post("/appointment", isAuthenticated, async (req, res) => {
    const { patientid, doctorid, staffid, appointmentdate, appointmenttime, reason, astatus } = req.body;
    if (!patientid || !doctorid || !staffid || !appointmentdate || !appointmenttime || !reason || !astatus) {
        return res.status(400).send("All fields are required.");
    }
    try {
        const result = await db.query(
            `INSERT INTO appointment (patientid, doctorid, staffid, appointmentdate, appointmenttime, 
            reasonforappointment, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, 
            [patientid, doctorid, staffid, appointmentdate, appointmenttime, reason, astatus]
        );
        const user = result.rows[0];
        console.log(user);
        res.redirect("/api/appointment");
    } catch (err) {
        console.log(err);
    }
});

//update appointment 

router.get("/updateappointment/:id", isAuthenticated, async (req, res) => {
    const id = req.params.id;
    console.log(id);
    res.render('updateappointment.ejs', { appointmentid: id});
});

router.post("/updateappointment/:id", isAuthenticated, async (req, res) => {
    const id = req.params.id;
    
    const { patientid, doctorid, staffid, appointmentdate, appointmenttime, reason, astatus } = req.body;
    try {
        const result = await db.query(
            `UPDATE appointment SET
            patientid = $1,
            doctorid = $2,
            staffid = $3,
            appointmentdate = $4,
            appointmenttime = $5,
            reasonforappointment = $6,
            status = $7
            WHERE appointmentid = $8
            RETURNING *`,
            [patientid, doctorid, staffid, appointmentdate, appointmenttime, reason, astatus, id]
        );
        console.log(result.rows);
        res.redirect("/api/appointment");
    } catch (err) {
        console.log(err);
    }
});

//delete appointment

router.get("/deleteappointment/:id", isAuthenticated, async (req, res) => {
    const appid = req.params.id;
    try {
        await db.query("DELETE FROM appointment WHERE appointmentid = $1", [appid]);
        res.redirect("/api/appointment");
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error.');
    }
});

export default router;
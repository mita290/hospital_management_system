import express from 'express';
import db from '../../db.js'; 
import { isAuthenticated } from "../../middleware/auth.js";

const router = express.Router();

//addpatient

router.get("/patient", isAuthenticated, (req, res) => {
    res.render("addpatient.ejs");
});

router.post("/patient", isAuthenticated, async (req, res) => {
    const { fullname, dob, gender, phone, email, address } = req.body;
    if (!fullname || !dob || !phone || !address || !gender) {
        return res.status(400).send("All fields are required.");
    }
    try {
        let contactinformation = JSON.stringify({"Phone": phone, "email": email, "address": address});
        const result = await db.query("INSERT INTO patient (name, dob, gender, contactinformation) VALUES ($1, $2, $3, $4) RETURNING *",
            [fullname, dob, gender, contactinformation]
        );
        const user = result.rows[0];
        console.log(user);
        res.redirect("/api/patient");
    } catch (err) {
        console.log(err);
    }
});

//update patient

router.get("/updatepatient/:id", isAuthenticated, (req, res) => {
    const id = req.params.id;
    console.log(id);
    res.render("updatepatient.ejs", { patientid: id});
});

router.post("/updatepatient/:id", isAuthenticated, async (req, res) => {
    const id = req.params.id;
    const { fullname, dob, gender, phone, email, address } = req.body;
    try {
        let contactinformation = JSON.stringify({"Phone": phone, "email": email, "address": address});
        const result = await db.query(
            `UPDATE patient SET 
            name = $1,
            dob = $2,
            gender = $3,
            contactinformation = $4
            WHERE patientid = $5
            RETURNING *`,
            [fullname, dob, gender, contactinformation, id]
        );
        console.log(result.rows);
        res.redirect("/api/patient");
    } catch (err) {
        console.log(err);
    }
});


//deletepatient

router.get("/deletepatient/:id", isAuthenticated, async (req, res) => {
    const patientId = req.params.id;
    try {
        console.log(patientId);
        await db.query('DELETE FROM patient WHERE patientid = $1', [patientId]);
        res.redirect('/api/patient');
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error.');
    }
});

export default router;
import express from 'express';
import db from '../../db.js'; 
import { isAuthenticated } from "../../middleware/auth.js";

const router = express.Router();

//add bill

router.get("/billing", isAuthenticated, (req, res) => {
    res.render("addbilling.ejs");
});

router.post("/billing", isAuthenticated, async (req, res) => {
    const { appointmentid, patientid, doctorid, consultationfee, additionalcosts, billingdate, paymentstatus } = req.body;
    if (!appointmentid || !patientid || !doctorid || !consultationfee || !additionalcosts || !billingdate || !paymentstatus) {
        return res.status(400).send("All fields are required.");
    }
    try {
        const result = await db.query(
            `INSERT INTO billing ( appointmentid, patientid, doctorid, consultationfee, additionalcosts, 
            billingdate, paymentstatus ) VALUES ( $1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [appointmentid, patientid, doctorid, consultationfee, additionalcosts, billingdate, paymentstatus]
        );
        const bill = result.rows[0];
        console.log(bill);
        res.redirect('/api/billing');
    } catch (err) {
        console.log(err);
    }
});

//update bill

router.get('/updatebilling/:id', isAuthenticated, (req, res) => {
    const id = req.params.id;
    console.log(id);
    res.render('updatebilling.ejs', { billingid: id });
});

router.post('/updatebilling/:id', isAuthenticated, async (req, res) => {
    const id = req.params.id;
    const { appointmentid, patientid, doctorid, consultationfee, additionalcosts, billingdate, paymentstatus } = req.body;
    try {
        const result = await db.query(
            `UPDATE billing SET
            appointmentid = $1,
            patientid = $2,
            doctorid = $3,
            consultationfee = $4, 
            additionalcosts = $5, 
            billingdate = $6, 
            paymentstatus = $7
            WHERE billingid = $8 
            RETURNING *`,
            [appointmentid, patientid, doctorid, consultationfee, additionalcosts, billingdate, paymentstatus, id]
        );
        console.log(result.rows);
        res.redirect('/api/billing');
    } catch (err) {
        console.log(err);
    }
});

//delete billing

router.get("/deletebilling/:id", isAuthenticated, async (req, res) => {
    const id = req.params.id;
    try {
        await db.query("DELETE FROM billing WHERE billingid = $1", [id]);
        res.redirect('/api/billing');
    } catch (err) {
        console.log(err);
    }
});

export default router;
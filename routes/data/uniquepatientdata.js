import express from 'express';
import db from '../../db.js'; 
import { isAuthenticated } from "../../middleware/auth.js";

const router = express.Router();

//render page for patient details

router.get("/patientdetail/:id", isAuthenticated, async (req, res) => {
    const id = req.params.id;
    try {
        const patientResult = await db.query(
            `SELECT patientid, name, dob, gender, contactinformation->>'Phone' 
            as phone, contactinformation->>'email' as email, 
            contactinformation->>'address' as address FROM patient 
            WHERE patientid = $1`, [id]
        );
        const mhResult = await db.query(
            `SELECT medicalhistoryid, date, details, patientid FROM medicalhistory WHERE patientid = $1`, [id]
        );
        const preResult = await db.query(
            `SELECT p.prescriptionid, p.date, p.medicationdetails, d.name, p.patientid as patientid, d.doctorid as doctorid
            FROM prescription p JOIN doctor d
            ON p.doctorid = d.doctorid
            WHERE p.patientid = $1`, [id]
        );

        let updata = (patientResult.rows.length > 0) ? patientResult.rows : "";
        let mhdata = (mhResult.rows.length > 0) ? mhResult.rows : "";
        let predata = (preResult.rows.length > 0) ? preResult.rows : "";

        const formatDate = (dateString) => {
            let birthDate = new Date(dateString);
            let day = birthDate.getDate();
            let month = birthDate.getMonth() + 1; 
            let year = birthDate.getFullYear();
            if (day < 10) {
                day = '0' + day;
            }
            if (month < 10) {
                month = '0' + month;
            }
            return `${day}-${month}-${year}`;
        };

        if (Array.isArray(updata)) {
            updata = updata.map(patient => {
                if (patient.dob) {
                    patient.dob = formatDate(patient.dob);
                }
                return patient;
            });
        }

        if (Array.isArray(mhdata)) {
            mhdata = mhdata.map(history => {
                if (history.date) {
                    history.date = formatDate(history.date);
                }
                return history;
            });
        }

        if (Array.isArray(predata)) {
            predata = predata.map(prescription => {
                if (prescription.date) {
                    prescription.date = formatDate(prescription.date);
                }
                return prescription;
            });
        }

        res.render('uniquepatientdata.ejs', {updata: updata, mhdata: mhdata, predata: predata})
    } catch (error) {
        console.error("Error fetching patient data:", error);
        res.status(500).json({ error: "An error occurred while fetching patient data." });
    }
});

//add medical history

router.get("/mhdata/:id", isAuthenticated, (req, res) => {
    const id = req.params.id;
    res.render("addmedicalhistory.ejs", { patientid: id });
});

router.post("/mhdata/:id", isAuthenticated, async (req, res) => {
    const id = req.params.id;
    const { date, details } = req.body;
    try {
        const result = await db.query(`INSERT INTO medicalhistory (patientid, date, details) VALUES ($1, $2, $3) RETURNING *`, [id, date, details]);
        console.log(result.rows[0]);
        let url = "/data/patientdetail/"+id;
        res.redirect(url);
    } catch (err) {
        console.log(err);
    }

});

//update medical history

router.get("/updatemh/:mid&:pid", isAuthenticated, (req, res) => {
    const { mid, pid} = req.params;
    res.render("updatemedicalhistory.ejs", { medicalhistoryid: mid, patientid: pid});
});

router.post("/updatemh/:mid&:pid",isAuthenticated, async (req, res) =>{
    const { mid, pid } = req.params;
    const { date, details } = req.body; 
    try {
        const result = await db.query(
            `UPDATE medicalhistory SET date = $1, details = $2, patientid = $3 WHERE medicalhistoryid = $4 RETURNING *`,
            [date, details, pid, mid]
        );
        console.log(result.rows[0]);
        let url = "/data/patientdetail/"+pid;
        res.redirect(url);
    } catch (err) {
        console.log(err);
    }
});

//delete medical history

router.get("/deletemh/:mid&:pid", isAuthenticated, async (req, res) => {
    const { mid, pid } = req.params;
    try {
        await db.query('DELETE FROM medicalhistory WHERE medicalhistoryid = $1', [mid]);
        let url = "/data/patientdetail/"+pid;
        res.redirect(url);
    } catch (err) {
        console.log(err);
    }
});

//add prescription

router.get("/predata/:id", isAuthenticated, (req, res) => {
    const id = req.params.id;
    res.render("addprescription.ejs", { patientid: id });
});

router.post("/predata/:id", isAuthenticated, async (req, res) => {
    const id = req.params.id;
    const { doctorid, date, medicationdetails } = req.body;
    try {
        const result = await db.query(
            `INSERT INTO prescription (patientid, doctorid, date, medicationdetails) VALUES ($1, $2, $3, $4) RETURNING *`, 
            [id, doctorid, date, medicationdetails]
        );
        console.log(result.rows[0]);
        let url = "/data/patientdetail/"+id;
        res.redirect(url);
    } catch (err) {
        console.log(err);
    }

});

//update prescription

router.get("/updatepre/:prid&:pid&:did", isAuthenticated, (req, res) => {
    const { prid, pid, did } = req.params;
    res.render('updateprescription.ejs', { prescriptionid: prid, patientid: pid, doctorid: did});
});

router.post("/updatepre/:prid&:pid&:did", isAuthenticated, async (req, res) => {
    const { prid, pid, did } = req.params;
    const { date, medicationdetails } = req.body;
    try {
        const result = await db.query(
            `UPDATE prescription SET 
            date = $1, medicationdetails = $2,
            patientid = $3, doctorid = $4 
            WHERE prescriptionid = $5  
            RETURNING *`,
            [date, medicationdetails, pid, did, prid]
        );
        console.log(result.rows[0]);
        let url = "/data/patientdetail/"+pid;
        res.redirect(url);
    } catch (err) {
        console.log(err);
    }
});

//delete prescription

router.get("/deletepre/:prid&:pid", isAuthenticated, async (req, res) => {
    const { prid, pid } = req.params;
    try {
        await db.query('DELETE FROM prescription WHERE prescriptionid = $1', [prid]);
        let url = "/data/patientdetail/"+pid;
        res.redirect(url);
    } catch (err) {
        console.log(err);
    }
});

export default router;
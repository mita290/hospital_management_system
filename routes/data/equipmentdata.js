import express from 'express';
import db from '../../db.js'; 
import { isAuthenticated } from "../../middleware/auth.js";

const router = express.Router();

//add equipment

router.get("/equipment", isAuthenticated, (req, res) => {
    res.render("addequipment.ejs");
});

router.post("/equipment", isAuthenticated, async (req, res) => {
    const { type, quantity, astatus, lastcheckeddate, staffid } = req.body;
    if (!type || !quantity || !astatus || !lastcheckeddate || !staffid ) {
        return res.status(400).send("All fields are required.");
    }
    try {
        const result = await db.query(
            `INSERT INTO equipment ( type, quantity, status, lastcheckeddate, staffid ) 
            VALUES ( $1, $2, $3, $4, $5) RETURNING *`,
            [type, quantity, astatus, lastcheckeddate, staffid ]
        );
        const e = result.rows[0];
        console.log(e);
        res.redirect('/api/equipment');
    } catch (err) {
        console.log(err);
    }
});

//update equipment

router.get('/updateequipment/:id', isAuthenticated, (req, res) => {
    const id = req.params.id;
    console.log(id);
    res.render('updateequipment.ejs', { equipmentid: id });
});

router.post('/updateequipment/:id', isAuthenticated, async (req, res) => {
    const id = req.params.id;
    const { type, quantity, astatus, lastcheckeddate, staffid } = req.body;
    try {
        const result = await db.query(
            `UPDATE equipment SET
            type = $1,
            quantity = $2,
            status = $3,
            lastcheckeddate = $4, 
            staffid = $5
            WHERE equipmentid = $6 
            RETURNING *`,
            [type, quantity, astatus, lastcheckeddate, staffid, id]
        );
        console.log(result.rows);
        res.redirect('/api/equipment');
    } catch (err) {
        console.log(err);
    }
});

//delete equipment

router.get("/deleteequipment/:id", isAuthenticated, async (req, res) => {
    const id = req.params.id;
    try {
        await db.query("DELETE FROM equipment WHERE equipmentid = $1", [id]);
        res.redirect('/api/equipment');
    } catch (err) {
        console.log(err);
    }
});

export default router;
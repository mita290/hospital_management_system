import express from 'express';
import db from '../../db.js'; 
import { isAuthenticated } from "../../middleware/auth.js";

const router = express.Router();

//add equipment

router.get("/rooms", isAuthenticated, (req, res) => {
    res.render("addroom.ejs");
});

router.post("/rooms", isAuthenticated, async (req, res) => {
    const { type, astatus, assignedpatientid } = req.body;
    if( astatus === "Occupied" ) {
        if ( !assignedpatientid ) {
            return res.status(400).send("All fields are required.");
        } 
    }
    try {
        const result = await db.query(
            `INSERT INTO room ( type, status, assignedpatientid ) 
            VALUES ( $1, $2, $3 ) RETURNING *`,
            [type, astatus, assignedpatientid]
        );
        const room = result.rows[0];
        console.log(room);
        res.redirect('/api/rooms');
    } catch (err) {
        console.log(err);
    }
});

//update room

router.get('/updateroom/:id', isAuthenticated, (req, res) => {
    const id = req.params.id;
    console.log(id);
    res.render('updateroom.ejs', { roomid: id });
});

router.post('/updateroom/:id', isAuthenticated, async (req, res) => {
    const id = req.params.id;
    const { type, astatus, assignedpatientid } = req.body;
    try {
        const result = await db.query(
            `UPDATE room SET
            type = $1,
            status = $2,
            assignedpatientid = $3 
            WHERE roomid = $4 
            RETURNING *`,
            [type, astatus, assignedpatientid, id]
        );
        console.log(result.rows);
        res.redirect('/api/rooms');
    } catch (err) {
        console.log(err);
    }
});

//delete room

router.get("/deleteroom/:id", isAuthenticated, async (req, res) => {
    const id = req.params.id;
    try {
        await db.query("DELETE FROM room WHERE roomid = $1", [id]);
        res.redirect('/api/rooms');
    } catch (err) {
        console.log(err);
    }
});

export default router;
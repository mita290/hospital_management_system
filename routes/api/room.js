import express from 'express';
import db from '../../db.js'; 
import { isAuthenticated } from "../../middleware/auth.js";

const router = express.Router();

router.get("/rooms", isAuthenticated, async (req, res) => {
    try {
        const result1  = await db.query(
            `SELECT r.*, p.name 
            FROM room r
            JOIN patient p
            ON r.assignedpatientid = p.patientid
            ORDER BY r.roomid ASC`
        );
        const result2 = await db.query('SELECT * FROM room ORDER BY roomid ASC');
        let allroomdata = (result2.rows.length != 0) ? result2.rows : "No Data Available";
        let roomdata = (result1.rows.length != 0) ? result1.rows : "No Data Available";
        res.render('room.ejs', { allroomdata: allroomdata, roomdata: roomdata });
    } catch (err) {
        console.log(err);
    }
});

export default router;
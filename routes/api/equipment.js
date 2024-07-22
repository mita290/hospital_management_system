import express from 'express';
import db from '../../db.js'; 
import { isAuthenticated } from "../../middleware/auth.js";
import getPieChartData from '../../public/assets/javascript/piechart.js';

const router = express.Router();

router.get('/equipment', isAuthenticated, async (req, res) => {
    try {
        const result = await db.query(
            `select e.*, s.name 
            from equipment e 
            join staff s 
            on e.staffid = s.staffid 
            order by e.equipmentid;`
        );
        if (result.rows.length != 0) {
            if (Array.isArray(result.rows)) {
                result.rows = result.rows.map(r => {
                    if (r.lastcheckeddate) {
                        let lastcheckeddate = new Date(r.lastcheckeddate);
                        let day = lastcheckeddate.getDate();
                        let month = lastcheckeddate.getMonth() + 1; 
                        let year = lastcheckeddate.getFullYear();
                        let word = lastcheckeddate.getDay();
                        if (day < 10) {
                            day = '0' + day;
                        }
                        if (month < 10) {
                            month = '0' + month;
                        }
                        const arr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                        r.lastcheckeddate = `${day}-${month}-${year}, ${arr[word]}`;
                    }
                    return r;
                });
            }
            let equipmentdata = result.rows;            
            const piechart = await getPieChartData();
            
            console.log(typeof(piechart) + piechart);
            res.render('equipment.ejs', { equipmentdata: equipmentdata, piechart: piechart });
        }
    } catch (err) {
        console.log(err);
    }
});

export default router;
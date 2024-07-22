import express from "express";
import bcrypt from "bcrypt";
import db from "../db.js";

const router = express.Router();
const saltRounds = 10;
const activeSessions = {};

router.post("/register", async (req, res) => {
    const { fullname, email, password, phone, address, role, gender } = req.body;

    if (!fullname || !email || !password || !phone || !address || !role || !gender) {
        return res.status(400).send("All fields are required.");
    }

    try {
        const checkResult = await db.query("select * from staff where username = $1", [email]);
        if (checkResult.rows.length > 0) {
            return res.redirect("/login");
        } else {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send("Internal server error.");
                } else {
                    let contact = JSON.stringify({ "Email": email, "Phone": phone, "Address": address });
                    const result = await db.query("insert into staff (name, username, password, contactinformation, role, gender) values ($1, $2, $3, $4, $5, $6) returning *",
                        [fullname, email, hash, contact, role, gender]
                    );
                    const user = result.rows[0];
                    return res.redirect("/login");
                }
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error.");
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        if(Object.keys(activeSessions).length > 0) {
            return res.send("A user is already logged in. Please try again later.");
        }
        const result = await db.query("SELECT * FROM staff WHERE username = $1", [username]);
        if (result.rows.length > 0) {
            const storedPassword = result.rows[0].password;
            bcrypt.compare(password, storedPassword, (err, status) => {
                if (status) {
                    req.session.user = result.rows[0];
                    activeSessions[req.sessionID] = true;
                    res.redirect("/api/dashboard");
                } else {
                    res.send("Wrong password");
                }
                if (err) {
                    console.log(err);
                }
            });
        } else {
            res.send("User does not exist!");
        }
    } catch (err) {
        console.log(err);
    }
});

router.get("/logout", (req, res) => {
    if(req.session.user) {
        const key = req.sessionID;
        console.log(activeSessions);
        delete activeSessions[key];
    }
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/login");
        }
    })
})

export default router;

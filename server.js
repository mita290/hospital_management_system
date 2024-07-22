import express from "express";
import bodyParser from "body-parser";
import env from 'dotenv';
import session from 'express-session';

//importing routes
import mainRoutes from "./routes/mainRoutes.js";
import authRoutes from "./routes/authRoutes.js";
//api routes
import dashboardRoute from "./routes/api/dashboard.js";
import patientRoute from  "./routes/api/patient.js";
import doctorRoute from "./routes/api/doctor.js";
import staffRoute from "./routes/api/staff.js";
import apppointmentRoute from "./routes/api/appointment.js";
import billingRoute from "./routes/api/billing.js";
import equipmentRoute from "./routes/api/equipment.js";
import roomRoute from "./routes/api/room.js";
//data routes
import patientdataRoute from "./routes/data/patientdata.js";
import appointmentdataRoute from "./routes/data/appointmentdata.js";
import billingdataRoute from "./routes/data/billingdata.js";
import equipmentdataRoute from "./routes/data/equipmentdata.js";
import roomdataRoute from "./routes/data/roomdata.js";
import uniquepatientdataRoute from "./routes/data/uniquepatientdata.js";

const app = express();
const port = 3000;

env.config();

app.use(session({
    secret: process.env.SESSION_SECRET,  
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set to true in production with HTTPS
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

app.use("/", mainRoutes);
app.use("/", authRoutes);

app.use("/api", dashboardRoute);
app.use("/api", patientRoute);
app.use("/api", doctorRoute);
app.use("/api", staffRoute);
app.use("/api", apppointmentRoute);
app.use("/api", billingRoute);
app.use("/api", equipmentRoute);
app.use("/api", roomRoute);

app.use("/data", patientdataRoute);
app.use("/data", appointmentdataRoute);
app.use("/data", billingdataRoute);
app.use("/data", equipmentdataRoute);
app.use("/data", roomdataRoute);
app.use("/data", roomdataRoute);
app.use("/data", uniquepatientdataRoute);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


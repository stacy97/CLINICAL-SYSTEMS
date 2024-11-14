const express = require('express');
const http = require('http');
const app = express();
const port = 3000;
const path = require('path');
const mysql = require('mysql2');
const server = http.createServer(app);


//connecting a database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Natasha22@',
    database: 'health_records',

});
// Connect to the database
connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database: ' + err.stack);
      return;
    }
  
    console.log('Connected to database as id ' + connection.threadId);
  });

//serving static files from the 'public directory
app.use(express.static(path.join(__dirname, 'public')));


app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'registration.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/patientdiagnoses', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'patientdiagnoses.html'));
});

app.get('/medication', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'medication.html'));
}); 

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.post('/login', express.urlencoded({extended: true}), async (req, res) => {
    const {username, password} =req.body;
    const regQuery = `INSERT INTO login_table(username, password) VALUES (?,?)`;
    const details = connection.execute(regQuery,[username, password]);
    res.redirect('/signup');

})


app.post('/signup', express.urlencoded({extended: true}), async (req, res) => {
    const {patientsname, dob, gender, address, phone} =req.body;
    const regQuery = `INSERT INTO patientsregistration_table(patientsname, dob, gender, address, phonenumber) VALUES (?,?,?,?,?)`;
    const details = connection.execute(regQuery,[patientsname, dob, gender, address, phone]);
    res.redirect('/patientdiagnoses');

}) 



app.post('/registration', express.urlencoded({extended: true}), async (req, res) => {
    const {username, password, patientsname, dob, gender, address, phone} =req.body;
    const regQuery = `INSERT INTO patientsregistration_table(username, password, patientsname, dob, gender, address, phonenumber) VALUES (?,?,?,?,?,?,?)`;
    const details = connection.execute(regQuery,[username, password, patientsname, dob, gender, address, phone]);
    res.redirect('/patientdiagnoses');

})

app.post('/patientdiagnoses', express.urlencoded({extended: true}), async (req, res) => {
    const { idnumber, name, dob, gender, allergies, medications, diagnosis, lastvisitdate, mewappointmentdate} =req.body;
    const regQuery = `INSERT INTO patientdiagnoses_table(PatientID, name, dob, gender, allergies, medications, diagnosis, LastVisitDate, newAppointmentDate) VALUES (?,?,?,?,?,?,?,?,?)`;
    const details = connection.execute(regQuery,[idnumber, name, dob, gender, allergies, medications, diagnosis, lastvisitdate, mewappointmentdate]);
    res.redirect('/medication');

})


app.post('/medication', express.urlencoded({extended: true}), async (req, res) => {
    const {medicationname, dosage, frequency, duration} =req.body;
    const regQuery = `INSERT INTO medication_table(medicationname, dosage, frequency, duration) VALUES (?,?,?,?)`;
    const details = connection.execute(regQuery,[medicationname, dosage, frequency, duration]);
    res.redirect('/home');

})

//starting server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

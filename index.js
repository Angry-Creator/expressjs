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
const postLocationQuery = "INSERT INTO LocationTracker (time, location) VALUES (?,?)";
function checkingData(client_firstname, client_lastname, client_phonenumber, client_password, client_pin, client_amount){
    return true;
};
function checkingLocationData(time, location){
    return true;
}
app.use(express.json());
app.use(express.text());
app.use(cors());
app.get("/GetData", (req, res)=>{
    db.query(getDataQuery, (error, result)=>{
        if(error) throw error;
        res.send(result);
    });
});
app.post("/PostData", (req, res)=>{
    const client_firstname = req.body.client_firstname;
    const client_lastname = req.body.client_lastname;
    const client_phonenumber = req.body.client_phonenumber;
    const client_password = req.body.client_password;
    const client_pin = req.body.client_pin;
    const client_amount = req.body.client_amount;
    if(checkingData()){
        db.query(postDataQuery, [client_firstname, client_lastname, client_phonenumber, client_password, client_pin, client_amount], (error, result)=>{
            if (error) throw error;
        });
        res.end();
    };
});
app.delete("/DeleteData", (req, res)=>{
    const client_firstname = req.body.client_firstname;
    const client_lastname = req.body.client_lastname;
    const client_phonenumber = req.body.client_phonenumber;
    const client_password = req.body.client_password;
    const client_pin = req.body.client_pin;
    const client_amount = req.body.client_amount;
    if(checkingData()){
        db.query(deleteDataQuery, [client_firstname, client_lastname, client_phonenumber, client_password, client_pin, client_amount], (error, result)=>{
            if (error) throw error;
        });
        res.end();
    };
});
app.get('/GetLocation', (req, res)=>{
    db.query(getLocationQuery, (err, result)=>{
        if (err) throw err;
        res.send(result);
    });
});
app.post('/PostLocation', (req, res)=>{
    req.body = JSON.parse({...req.body});
    const date = req.body.date;
    const location = req.body.location;
    db.query(postLocationQuery, [date, location]), (err, result)=>{
        if(err) throw err;
    }
});
app.listen(port, ()=>{
    console.log("Listening to PORT: ", port)
});
const express = require('express')
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql2')
const inputCheck = require('./utils/inputCheck')
//express middlewear
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //your MySQL username,
        user: 'root',
        //mysql password
        password: '1darkness',
        database: 'election'
    },
    console.log( 'Connected to the election database.')
)

//get all candidates
app.get('/api/candidates', (req,res) => {
    const sql = `SELECT candidates.*, parties.name
    AS party_name
    FROM candidates
    LEFT JOIN parties
    ON candidates.party_id = parties.id`;

db.query(sql, (err, rows) => {
    if(err) {
        res.status(500).json({error: err.message});
        return;
    }    
    res.json({
        message: 'Success',
        data: rows
        })
    })
})
//GET single candidate 
app.get('/api/candidate/:id', (req,res) => {
    const sql = `SELECT candidates.*, parties.name
    AS party_name
    FROM candidates
    LEFT JOIN parites
    ON candidates.party_id = parties.id
    WHERE candidates.id = ?`;
    const params = [req.params.id];


db.query(sql, params, (err,row)=> {
    if(err) {
        res.status(400).json({error: err.message})
        return;
    } 
    res.json({
        message: 'success',
        data: row
        })
    })
})
//delete candidate
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id =?`;
    const params = [req.params.id]
db.query(sql, params, (err, result)=> {
    if(err) {
        res.statusMessage(400).json({error: err.message})
    }else if (!result.affectedRows) {
        res.json({
            message: 'Candidate not found.'
        })
    }else {
        res.json({
            message: 'Deleted',
            changes: result.affectedRows,
            id: req.params.id
        })
    }
})
})
//Create candidate
app.post('/api/candidate', ({body}, res)=>{
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected')
    if(errors) {
        res.status(400).json({error: errors})
        return;
    }
    const sql = `INSERT INTO candidates ( first_name, last_name, industry_connected)
                VALUES(?,?,?)`
const params = [body.first_name, body.last_name, body.industry_connected];

db.query(sql, params, (err,result)=> {
    if(err){
    res.status(400).json({error : err.message})
    return
    }
    res.json({
        message: 'success',
        data: body
    })
})
})


//default response for any other request
app.use((req, res) => {
    res.status(404).end();
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
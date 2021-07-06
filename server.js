const express = require('express')
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql2')
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
// db.query(`SELECT * FROM candidates`,(err, rows) => {
//     console.log(rows);
// })
//GET single candidate 
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err,row)=> {
//     if(err) {
//         console.log(err)
//     } 
//     console.log(row)
// })
//delete candidate
// db.query('DELETE FROM candidates WHERE id = ?', 1, (err, result)=> {
//     if(err) {
//         console.log(err)
//     }
//     console.log(result)
// })
//CREate candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
//                 VALUES(?,?,?,?)`
// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err,result)=> {
//     if(err){
//     console.log(err)
//     }
//     console.log(result)
// })
//default response for any other request
app.use((req, res) => {
    res.status(404).end();
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
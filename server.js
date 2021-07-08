const express = require('express')
const PORT = process.env.PORT || 3001;
const db = require('./db/connection')
const apiRoutes = require('./routes/apiroutes')

//express middlewear
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//use apiroutes
app.use('/api', apiRoutes)


//default response for any other request
app.use((req, res) => {
    res.status(404).end();
})

// start server after DB connection
db.connect(err => {
    if(err) throw err;
    console.log('Database connected.')
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
    });
});
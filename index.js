const express = require('express');
const app = express();
const PORT = 5000;

const userRoutes = require('./routes/users')


app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.use('/users', userRoutes)



app.listen(PORT, () => {
    console.log("app started at port", PORT);
})
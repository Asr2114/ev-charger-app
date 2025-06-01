const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const authRoutes = require('./routes/auth');
const stationRoutes = require('./routes/stations')

const app = express();
app.use(cors());
app.use(express.json());

// app.use((req, res, next) => {
//     console.log('DEBUG [Server] req.body:', req.body);
//     next();
//   });

app.post('/test', (req, res) => {
    console.log('DEBUG [Test route] req.body:', req.body);
    res.json({ received: req.body });
  });
  
  
  

app.use('/api/auth', authRoutes);
app.use('/api/stations', stationRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => app.listen(5500, ()=> console.log("Server running on port 5500")))
.catch(err => console.log(err));
const express = require('express');
const app = express();
const logger =require('./middleware/logger');
const userRoutes =require('./routes/userRoutes');
const menuRoutes =require('./routes/menuRoutes');
const studentRoutes = require('./routes/studentRoutes');

const PORT = 3000;

app.use(express.json());
app.use(logger);
require('dotenv').config();

const connectDB = require('./dbconnection/db').default;
connectDB();

app.use('/users',userRoutes);
app.use('/menu',menuRoutes);
app.use('/student', studentRoutes);

// app.listen(PORT, () => {
//   console.log(`server running on http://localhost:${PORT}`);
// });

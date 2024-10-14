const express = require('express');
const app = express();
require('dotenv').config();




const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
app.use(express.json()); 


app.use('/api', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', serviceRoutes);


app.use((req, res, next) => {
  res.status(404).send('404 - Route Not Found');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

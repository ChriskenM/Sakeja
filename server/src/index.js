require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth.js');
const houseRoutes = require('./routes/houses.js');
const messageRoutes = require('./routes/messages.js');


const app = express();
app.use(cors());
app.use(express.json());

// test home route 
app.get('/', (req, res) => {
  res.send("API is running...");
});

app.use('/api/auth', authRoutes);
app.use('/api/houses', houseRoutes);
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(()=> {
    app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));
  })
  .catch(err => console.error(err));

  app.listen(5000, () => console.log("Server running on port 5000"));
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

// חיבור למסד הנתונים (MongoDB)
mongoose.connect('mongodb://localhost:27017/flightDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// הגדרת סכימה לטבלת הנתונים
const flightSchema = new mongoose.Schema({
  altitude: Number,
  hsi: Number,
  adi: Number
});

const FlightData = mongoose.model('FlightData', flightSchema);

// הגדרות כלליות
app.use(cors());
app.use(bodyParser.json());

// ✅ שליפת הערך האחרון
app.get('/api/data', async (req, res) => {
  try {
    const lastEntry = await FlightData.findOne().sort({ _id: -1 });
    if (lastEntry) {
      res.json(lastEntry);
    } else {
      res.json({ altitude: 0, hsi: 0, adi: 0 });
    }
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ הוספת נתון חדש
app.post('/api/data', async (req, res) => {
  try {
    const newData = new FlightData(req.body);
    await newData.save();
    res.json({ message: 'Data saved to MongoDB', data: newData });
  } catch (err) {
    console.error('Error saving data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ שליפת כל ההיסטוריה
app.get('/api/history', async (req, res) => {
  try {
    const allData = await FlightData.find().sort({ _id: -1 });
    res.json(allData);
  } catch (err) {
    console.error('Error fetching history:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ מחיקת כל ההיסטוריה
app.delete('/api/history', async (req, res) => {
  try {
    await FlightData.deleteMany({});
    res.json({ message: 'History cleared' });
  } catch (err) {
    console.error('Error clearing history:', err);
    res.status(500).json({ error: 'Failed to clear history' });
  }
});

// הפעלת השרת
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

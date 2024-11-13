import express from 'express';

const router = express.Router();

// Get weather data
router.get('/', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const apiKey = process.env.OPENWEATHER_API_KEY || 'demo';
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

function generateTrendData(keyword) {
  const data = [];
  const baseValue = Math.floor(Math.random() * (70 - 30 + 1)) + 30;
  const volatility = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const value = Math.max(0, Math.min(100, baseValue + (Math.random() * 2 - 1) * volatility));
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(value),
      keyword
    });
  }
  
  return data;
}

app.get('/trends', (req, res) => {
  const keywords = req.query.keywords ? req.query.keywords.split(',') : [];
  const result = keywords.reduce((acc, keyword) => {
    return [...acc, ...generateTrendData(keyword.trim())];
  }, []);
  
  res.json(result);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
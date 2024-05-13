const express = require('express');
const path = require('path');
const app = express();

const workingHoursMiddleware = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay(); 
  const hour = now.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.status(403).send('The website is only available during working hours (Monday to Friday, from 9 AM to 5 PM).');
  }
};


app.use(workingHoursMiddleware);

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

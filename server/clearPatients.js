require('dotenv').config(); 
const mongoose = require('mongoose');
const Patient = require('./models/Patient');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('Połączono z MongoDB');

    const result = await Patient.deleteMany({});
    console.log(`Usunięto ${result.deletedCount} dokumentów`);

    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Błąd połączenia z MongoDB:', err);
  });

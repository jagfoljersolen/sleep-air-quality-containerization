const mongoose = require('mongoose');
const Patient = require('../models/Patient');
const savePatientsToFile = require('../savePatientsToFile'); 

// Pobieranie wszystkich pacjentów
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    if (patients.length === 0) {
      return res.status(404).json({ msg: 'Brak pacjentów w bazie danych' });
    }
    res.json(patients);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ msg: 'Błąd serwera' });
  }
};

// Pobieranie pacjenta po ID
exports.getPatientById = async (req, res) => {
  console.log('🔍 getPatientById called with ID:', req.params.id);
  console.log('🔍 Request URL:', req.url);
  console.log('🔍 Request method:', req.method);
  
  const { id } = req.params;
  try {
    let patient = await Patient.findOne({_id: id});
    console.log('🔍 Database query result:', patient);
    
    if (!patient && mongoose.isValidObjectId(id)) {
      patient = await Patient.findOne({_id: new mongoose.Types.ObjectId(id)});
      console.log('🔍 ObjectId fallback result:', patient);
    }
    
    if (!patient) {
      return res.status(404).json({ msg: 'Pacjent nie znaleziony' });
    }
    
    res.json(patient);
  } catch (err) {
    console.error('Error in getPatientById:', err);
    res.status(500).json({ msg: 'Błąd serwera' });
  }
};


// Dodawanie pacjenta z transakcją i zapisem do pliku
exports.addPatient = async (req, res) => {
  // const session = await mongoose.startSession();
  // session.startTransaction();

  try {
    const {
      'Sleep Duration': SleepDuration,
      'Quality of Sleep': QualityOfSleep,
      'Physical Activity Level': PhysicalActivityLevel,
      'Stress Level': StressLevel,
      Age,
      'BMI Category': BMI,
      'Blood Pressure': BloodPressure,
      Gender,
      Occupation,
      HeartRate,
      DailySteps,
      SleepDisorder,
      PersonID,
      FirstName,
      LastName
    } = req.body;

    const newPatient = new Patient({
      'Sleep Duration': SleepDuration,
      'Quality of Sleep': QualityOfSleep,
      'Physical Activity Level': PhysicalActivityLevel,
      'Stress Level': StressLevel,
      Age,
      'BMI Category': BMI,
      'Blood Pressure': BloodPressure,
      Gender,
      Occupation,
      HeartRate,
      DailySteps,
      SleepDisorder,
      PersonID,
      FirstName,
      LastName
    });

    // const savedPatient = await newPatient.save({ session });
    const savedPatient = await newPatient.save();
    await savePatientsToFile();

    // await session.commitTransaction();
    // session.endSession();

    res.status(201).json(savedPatient);
  } catch (err) {
    // await session.abortTransaction();
    // session.endSession();
    console.error(err);
    res.status(500).json({ msg: 'Błąd serwera' });
  }
};

// izolacja do bazy
exports.updatePatient = async (req, res) => {
  // const session = await mongoose.startSession();
  // session.startTransaction();

  try {
    const updated = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      // { new: true, session }
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Pacjent nie znaleziony' });
    }

    await savePatientsToFile();

    // await session.commitTransaction();
    // session.endSession();

    res.json(updated);
  } catch (err) {
    console.error("Update error:", err);
    // await session.abortTransaction();
    // session.endSession();
    res.status(400).json({ message: "Błąd aktualizacji pacjenta" });
  }
};

// Usuwanie pacjenta z zapisem do pliku (bez transakcji, bo to pojedyncza operacja)
exports.deletePatient = async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);

    await savePatientsToFile();

    res.json({ message: "Pacjent usunięty" });
  } catch (err) {
    res.status(400).json({ message: "Błąd usuwania pacjenta" });
  }
};

import { Router } from "express";
import Patient from "../models/patient";
import PatientAdditionData from '../models/patientAddData';

const clinicalRouter = Router();

clinicalRouter.get('/', async (req, res) => {
    const patients = await Patient.find();
    // console.log('All Patients: ', patients);
    res.send({message: 'All Patients Retrieved!', patients});
});

clinicalRouter.get('/:id', async (req, res) => {
    const patientId = req.params.id;
    const patient = await Patient.findById(patientId);
    // console.log(`Patients with Id: ${patientId}: `, patient);
    res.send({message: `Patients with Id: ${patientId} Retrieved!`, patient});
});

clinicalRouter.post('/', async (req, res) => {
    const data = new Patient(req.body);
    const newPatient = await data.save();
    // console.log('Saved Patient: ', newPatient);
    res.status(201).send({message: 'A new Patient Added!', newPatient});
});

clinicalRouter.delete('/:id', async (req, res) => {
    const patientId = req.params.id;
    const patient = await Patient.findById(patientId);
    let deletedItem;
    if (patient) {
        deletedItem = await Patient.findByIdAndRemove(patientId);
        console.log('Deleted Patient: ', deletedItem);
    }
    res.status(200).send({message: 'Patient deleted!', deletedItem});
});

clinicalRouter.post('/AddData', async (req, res) => {
    const data: PatientAdditionData = req.body;
    const {patientId, componentName, componentValue} = data
    const patient = await Patient.findById(patientId);
    if (patient) {
        const component = {
            patientId,
            componentName,
            componentValue,
            measuredDateTime: new Date().toLocaleString()
        };
        patient.clinicalData.push(component);
        const updatedPatient = await patient.save();
        // console.log(`Additional data added to PatientId: ${patientId}`, updatedPatient);
        res.status(201).send({message: 'A new Patient Added!', updatedPatient});
    } else {
        res.status(404).send({message: `No Patient found with PatientId: ${patientId}`});
    }
});

clinicalRouter.get('/analyze/:id', async (req, res) => {
    const patientId = req.params.id;
    const patient = await Patient.findById(patientId);
    // console.log(`Patients with Id: ${patientId}: `, patient);
    res.send({message: 'Patients with Id: ${patientId} Retrieved!', patient});
});

export default clinicalRouter;
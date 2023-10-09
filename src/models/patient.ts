import { Schema, model } from "mongoose";

const clinicalDataSchema = new Schema({
    patientId: Schema.Types.ObjectId,
    componentName: String,
    componentValue: String,
    measuredDateTime: String
});

const patientSchema = new Schema({
    firstName: String,
    lastName: String,
    age: {type: Schema.Types.Number},
    clinicalData: [clinicalDataSchema]
});

const Patient = model('Patient', patientSchema);
export default Patient;
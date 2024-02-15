import mongoose, { Document } from 'mongoose';

const cityInfoSchema = new mongoose.Schema({
  name_translation: {
    type: mongoose.Schema.Types.Mixed,
  },
  case: {
    type: mongoose.Schema.Types.Mixed,
  },
  country_code: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  time_zone: String,
  name: String,
  coordinates: {
    lat: Number,
    lon: Number,
  },
});

type cityTypes = typeof cityInfoSchema;

const City = mongoose.model<cityTypes>('City', cityInfoSchema);

export default City;

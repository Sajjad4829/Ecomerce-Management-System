import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const SectionConfigurationSchema = new Schema({
  sectionType: { type: String, required: true, unique: true },
  content: { type: Schema.Types.Mixed, default: {} },
  settings: { type: Schema.Types.Mixed, default: {} },
}, {
  timestamps: true,
  strict: false
});

export default models.SectionConfiguration || model('SectionConfiguration', SectionConfigurationSchema);

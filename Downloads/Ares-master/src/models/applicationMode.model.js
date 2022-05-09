const mongoose = require('mongoose');

const applicationModeSchema = new mongoose.Schema(
    { mode: String, enum: ['maintenance', 'production'], default: 'production' }
);


const applicationModeModel = mongoose.model('applicationMode', applicationModeSchema);

module.exports = applicationModeModel;
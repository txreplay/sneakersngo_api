const mongooseSlugPlugin = require('mongoose-slug-plugin');
const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    name: String,
    createdBy: mongoose.Schema.Types.ObjectId,
    brand: mongoose.Schema.Types.ObjectId
}, {timestamps: true});

modelSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=name%>' });

module.exports = mongoose.model('Model', modelSchema);
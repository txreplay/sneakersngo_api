const mongooseSlugPlugin = require('mongoose-slug-plugin');
const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: String,
    createdBy: mongoose.Schema.Types.ObjectId
}, {timestamps: true});

brandSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=name%>' });

module.exports = mongoose.model('Brand', brandSchema);
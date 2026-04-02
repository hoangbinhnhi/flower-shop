const mongoose = require('mongoose');

const flowerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        type: { type: String, required: true },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        rating: { type: Number, required: true },
        description: { type: String },
    },
    {
        timestamps: true, 
    }
);

const Flower = mongoose.models.Flower || mongoose.model('Flower', flowerSchema, 'flowers');

module.exports = Flower;
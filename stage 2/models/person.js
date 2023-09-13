const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Full Name is required'],
        minlength: 3,
        trim: true,
        unique: true,
    },

},
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

const Person = mongoose.model('Person', personSchema);

module.exports = Person
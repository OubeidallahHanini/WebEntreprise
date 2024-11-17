const mongoose = require('mongoose');

const expertiseSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    desc: [
        {
            text: {
                type: String,
                required: true,
            },
        },
    ],
});



const ExpertiseData = mongoose.model('ExpertiseData', expertiseSchema);

module.exports = ExpertiseData;

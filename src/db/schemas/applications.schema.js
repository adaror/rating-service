const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    const applicationsSchema = new Schema({
        'id': { type: String, index: true },
        'name': { type: String, index: true },
        'category': { type: String, index: true },
        'averageAge': {type: Number},
        'sumOfAges': {type: Number},
        'numOfInstallers':{type: Number}
      });
        
      module.exports = applicationsSchema;
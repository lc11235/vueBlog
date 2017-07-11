const db = require('./config/mongoose.js');
const init = require('./init.json');
const Models = require('./dbModel/model.js');

const initialize = () => {
    Models.User.find(null, function (err, doc) {
        if (err) {
            console.log(err);
        } else if (!doc.length) {
            console.log('Database opens for the first time ...');
            Promise.all(init.map(item => new Models[item.type](item).save()))
                .then(() => console.log('Initialize successfully.'))
                .catch(() => console.log('Something went wrong during initializing.'));
        } else {
            Models.initialized = true;
        }
    });
};

db.on('error', () => {
    console.log('Database connection error.');
});

db.once('open', () => {
    console.log('The database has connected.');
    initialize();
})

module.exports = Models;


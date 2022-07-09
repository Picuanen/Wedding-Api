const seeder = require('./function');
const config = require('../dbConfig');

seeder.connect(config.dbUrl, function () {
  seeder.loadModels(['src/services/user/models/User.js']);

  seeder.clearModels(['User'], function () {
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });
  });
});

const data = [
  {
    model: 'User',
    documents: [
      {
        nim: '001',
        name: 'Super Admin',
        email: 'superadmin@codelabs-app.unikom.ac.id',
        password: 'code@labs',
        role: 'superadmin',
      },
    ],
  },
];

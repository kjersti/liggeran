var pg = require('pg');
var uuid = require('node-uuid');

module.exports = function(email) {

  var token = uuid.v4();
  console.log(process.env.DATABASE_URL);
  console.log('generate token ' + token + ' for email ' + email);

  var connectionString = process.env.DATABASE_URL || 'postgresql://liggeran:liggeran@localhost:5432/liggeran'

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      return console.error('error while getting connection to db', err);
    }

    client.query('INSERT INTO tokens (email, token) VALUES ($1, $2)', [email, token],
      function(err, result) {
        if(err) {
          console.error('error while saving token', err);
        }
        console.log('token saved.');
    });
    done();
  });

  return token;
}

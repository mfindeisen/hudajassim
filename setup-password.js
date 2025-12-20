#!/usr/bin/env node

const bcrypt = require('bcrypt');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('=== Admin Passwort Setup ===\n');

rl.question('Benutzername: ', (username) => {
  rl.question('Passwort: ', (password) => {
    bcrypt.hash(password, 10).then(hash => {
      console.log('\n=== Konfiguration ===');
      console.log(`ADMIN_USERNAME=${username}`);
      console.log(`ADMIN_PASSWORD_HASH=${hash}`);
      console.log('\nFüge diese Zeilen zu deiner .env Datei hinzu!\n');
      rl.close();
    });
  });
});


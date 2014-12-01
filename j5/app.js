var dotenv = require('dotenv');
dotenv.load();

if ( process.argv[2] === '--hardware' ) {
	require('./hardware');
}

require('./server');
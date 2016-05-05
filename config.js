// # Ghost Configuration
// Setup your Ghost install for various [environments](http://support.ghost.org/config/#about-environments).

// Ghost runs in `development` mode by default. Full documentation can be found at http://support.ghost.org/config/

var path = require('path'),
    config;

//Function for setting default ENV variables.
function CheckEnvVar(varname, defaultvalue)
{
    var result = process.env[varname];
    if(result!=undefined)
        return result;
    else
        return defaultvalue;
}

// Domain Variables
var devDomain = CheckEnvVar('DEV_DOMAIN', 'http://localhost:2368');
var prodDomain = CheckEnvVar('PROD_DOMAIN', 'http://example.com');

//Development Mail Variables
var devMailTransport = CheckEnvVar('DEV_MAIL_TRANSPORT', '');
var devMailService = CheckEnvVar('DEV_MAIL_SERVICE', '');
var devMailUser = CheckEnvVar('DEV_MAIL_USER', '');
var devMailPass = CheckEnvVar('DEV_MAIL_PASS', '');
var devMailFrom = CheckEnvVar('DEV_MAIL_FROM', '');

//Production Mail Variables
var prodMailTransport = CheckEnvVar('PROD_MAIL_TRANSPORT', '');
var prodMailService = CheckEnvVar('PROD_MAIL_SERVICE', '');
var prodMailUser = CheckEnvVar('PROD_MAIL_USER', '');
var prodMailPass = CheckEnvVar('PROD_MAIL_PASS', '');
var prodMailFrom = CheckEnvVar('PROD_MAIL_FROM', '');

config = {
    // ### Production
    // When running Ghost in the wild, use the production environment.
    // Configure your URL and mail settings here
    production: {
        url: prodDomain,
        mail: {
            from: prodMailFrom,
            transport: prodMailTransport,
            options: {
                service: prodMailService,
                auth: {
                    user: prodMailUser,
                    pass: prodMailPass
                }
            }
        },
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(process.env.GHOST_CONTENT, '/data/ghost.db')
            },
            debug: false
        },

        server: {
            host: '0.0.0.0',
            port: '2368'
        },
        // #### Paths
        // Specify where your content directory lives
        paths: {
            contentPath: path.join(process.env.GHOST_CONTENT, '/')
        }
    },

    // ### Development **(default)**
    development: {
        // The url to use when providing links to the site, E.g. in RSS and email.
        // Change this to your Ghost blog's published URL.
        url: devDomain,
        mail: {
            from: devMailFrom,
            transport: devMailTransport,
            options: {
                service: devMailService,
                auth: {
                    user: devMailUser,
                    pass: devMailPass
                }
            }
        },

        // #### Database
        // Ghost supports sqlite3 (default), MySQL & PostgreSQL
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(process.env.GHOST_CONTENT, '/data/ghost-dev.db')
            },
            debug: false
        },
        // #### Server
        // Can be host & port (default), or socket
        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '0.0.0.0',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: '2368'
        },
        // #### Paths
        // Specify where your content directory lives
        paths: {
            contentPath: path.join(process.env.GHOST_CONTENT, '/')
        }
    },

    // **Developers only need to edit below here**

    // ### Testing
    // Used when developing Ghost to run tests and check the health of Ghost
    // Uses a different port number
    testing: {
        url: 'http://0.0.0.0:2369',
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(process.env.GHOST_CONTENT, '/data/ghost-test.db')
            },
            pool: {
                afterCreate: function (conn, done) {
                    conn.run('PRAGMA synchronous=OFF;' +
                    'PRAGMA journal_mode=MEMORY;' +
                    'PRAGMA locking_mode=EXCLUSIVE;' +
                    'BEGIN EXCLUSIVE; COMMIT;', done);
                }
            }
        },
        server: {
            host: '0.0.0.0',
            port: '2369'
        },
        logging: false
    },

    // ### Testing MySQL
    // Used by Travis - Automated testing run through GitHub
    'testing-mysql': {
        url: 'http://0.0.0.0:2369',
        database: {
            client: 'mysql',
            connection: {
                host     : '0.0.0.0',
                user     : 'root',
                password : '',
                database : 'ghost_testing',
                charset  : 'utf8'
            }
        },
        server: {
            host: '0.0.0.0',
            port: '2369'
        },
        logging: false
    },

    // ### Testing pg
    // Used by Travis - Automated testing run through GitHub
    'testing-pg': {
        url: 'http://0.0.0.0:2369',
        database: {
            client: 'pg',
            connection: {
                host     : '0.0.0.0',
                user     : 'postgres',
                password : '',
                database : 'ghost_testing',
                charset  : 'utf8'
            }
        },
        server: {
            host: '0.0.0.0',
            port: '2369'
        },
        logging: false
    }
};

module.exports = config;

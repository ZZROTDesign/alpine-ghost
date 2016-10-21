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
var devSSLDomain = CheckEnvVar('DEV_SSL_DOMAIN', ''); // Won't advertise its useage, but it's there
var devForceAdminSSL= CheckEnvVar('DEV_FORCE_ADMIN_SSL', false);

var prodDomain = CheckEnvVar('PROD_DOMAIN', 'http://example.com');
var prodSSLDomain = CheckEnvVar('PROD_SSL_DOMAIN', ''); // Won't advertise its useage, but it's there
var prodForceAdminSSL= CheckEnvVar('DEV_FORCE_ADMIN_SSL', false);

//Development Mail Variables
var devMailTransport = CheckEnvVar('DEV_MAIL_TRANSPORT', '');
var devMailService = CheckEnvVar('DEV_MAIL_SERVICE', '');
var devMailHost = CheckEnvVar('DEV_MAIL_HOST', 'localhost');
var devMailName = CheckEnvVar('DEV_MAIL_NAME', '');
var devMailUser = CheckEnvVar('DEV_MAIL_USER', '');
var devMailPass = CheckEnvVar('DEV_MAIL_PASS', '');
var devMailFrom = CheckEnvVar('DEV_MAIL_FROM', '');
var devMailSecureConnection = CheckEnvVar('DEV_MAIL_SECURE_CONNECTION', false);
var devMailPort = CheckEnvVar('DEV_MAIL_PORT', 25);
var devMailIgnoreTLS = CheckEnvVar('DEV_MAIL_IGNORE_TLS', false);
var devMailDebug = CheckEnvVar('DEV_MAIL_DEBUG', '');

if (devMailService != '') {
    devMailHost = undefined
    devMailPort = undefined
    devMailSecureConnection = undefined
}

//Production Mail Variables
var prodMailTransport = CheckEnvVar('PROD_MAIL_TRANSPORT', '');
var prodMailService = CheckEnvVar('PROD_MAIL_SERVICE', '');
var prodMailHost = CheckEnvVar('PROD_MAIL_HOST', 'localhost');
var prodMailName = CheckEnvVar('DEV_MAIL_NAME', '');
var prodMailUser = CheckEnvVar('PROD_MAIL_USER', '');
var prodMailPass = CheckEnvVar('PROD_MAIL_PASS', '');
var prodMailFrom = CheckEnvVar('PROD_MAIL_FROM', '');
var prodMailSecureConnection = CheckEnvVar('PROD_MAIL_SECURE_CONNECTION', false);
var prodMailPort = CheckEnvVar('PROD_MAIL_PORT', 25);
var prodMailIgnoreTLS = CheckEnvVar('PROD_MAIL_IGNORE_TLS', false);
var prodMailDebug = CheckEnvVar('PROD_MAIL_DEBUG', '');

if (prodMailService != '') {
    prodMailHost = undefined
    prodMailPort = undefined
    prodMailSecureConnection = undefined
}

config = {
    // ### Production
    // When running Ghost in the wild, use the production environment.
    // Configure your URL and mail settings here
    production: {
        url: prodDomain,
        urlSSL: prodSSLDomain,
        forceAdminSSL: prodForceAdminSSL,
        mail: {
            from: prodMailFrom,
            transport: prodMailTransport,
            options: {
                ignoreTLS: prodMailIgnoreTLS,
                host: prodMailHost,
                port: prodMailPort,
                debug: prodMailDebug,
                secureConnection: prodMailSecureConnection,
                name: prodMailName,
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
        urlSSL: devSSLDomain,
        forceAdminSSL: devForceAdminSSL,
        mail: {
            from: devMailFrom,
            transport: devMailTransport,
            options: {
                ignoreTLS: devMailIgnoreTLS,
                host: devMailHost,
                port: devMailPort,
                debug: devMailDebug,
                secureConnection: devMailSecureConnection,
                name: devMailName,
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

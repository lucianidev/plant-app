const express = require('express')
const GlobalErrorHandler = require('./src/middleware/errorHandler')
const session = require('express-session');
const appRouters = require('./src/routes/router_wrapper');
const limit = require('express-rate-limit');
const MemcachedStoreSession = require("connect-memcached")(session);
const helmet = require('helmet');
const MemcachedStoreRate = require('rate-limit-memcached');
const cors = require('cors')
const path = require('path')
const app = express();
require('dotenv').config();
const limiter = limit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 200, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    store: new MemcachedStoreRate.MemcachedStore({
        // prefix: 'rl:', // The prefix attached to all keys stored in the cache.
        locations: [], // The server location(s), passed directly to Memcached.
    })
})

app.set('view engine', 'ejs')
app.use(helmet());
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(cors({origin: process.env.SESSION_SECRET}));
app.set('trust proxy', 1) // trust first proxy
app.use(limiter);
app.use(express.urlencoded())// 1 hour
app.use(express.json());
app.use(session({ path: '/',
    secret : process.env.SESSION_SECRET,
    httpOnly: true, 
    secure: process.env.PRODUCTION,
     maxAge: null,
     resave :false,
     saveUninitialized:false,
    store: new MemcachedStoreSession({
        hosts: [process.env.MEMCACHE_URL],
    })
    })
);



app.use('/', appRouters);

app.use(GlobalErrorHandler); // speriamo non lo prende mai questo degli errori

app.listen(process.env.LISTEN_PORT, () => console.log('listening'))
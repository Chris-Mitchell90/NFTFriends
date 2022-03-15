import Express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { router } from './router';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import 'dotenv/config'
const SQLLiteStore = require('connect-sqlite3')(session);
const PORT = process.env.PORT || 3001;

const app = Express();
app.use(
    session({
        store: new SQLLiteStore,
        name: 'sessionId',
        saveUninitialized: false,
        resave: false,
        secret: process.env.SESSION_SECRET || "thisisntsecretenough",
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, //1 day
            sameSite: true,
            httpOnly: false,
            secure: false,
        },
    })
);

app.use(cookieParser());

app.use(cors());
app.use(Express.json());
app.use(morgan('short'));
app.use(router);

app.listen(PORT, () => console.log(`listening port ${PORT}`))

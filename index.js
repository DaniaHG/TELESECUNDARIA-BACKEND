const express = require('express');
const cors = require('cors');
const router = require('./configurations/route');
const auth = require("./security/verifier");
const morgan = require('morgan');

const app = express();
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('common'))
}

app.use(express.json());

app.use(cors());

app.set('port', process.env.PORT || 3000);

app.use("/", cors({ origin: "*" }), auth, router)

app.listen(app.get('port'), () => {
    console.log(`Server en puerto ${app.get('port')}`);
});
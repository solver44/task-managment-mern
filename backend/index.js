import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import AppRoutes from './src/routes/index.js'
import ipAccessControl from "./src/utils/ipAccessControl.js";
import * as fs from "fs";
import * as https from "https";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

// Load SSL certificate files
const privateKey = fs.readFileSync('../certs/localhost-key.pem', 'utf8');
const certificate = fs.readFileSync('../certs/localhost.pem', 'utf8');
const credentials = {key: privateKey, cert: certificate};

app.use(ipAccessControl);
app.use(cors())
app.use(express.json())
app.use('/', AppRoutes);
https.createServer(credentials, app)
    .listen(PORT, () => console.log(`App is listening ${PORT}`))
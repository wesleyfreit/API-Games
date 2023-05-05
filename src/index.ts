import dotenv from "dotenv"
dotenv.config();

import express from "express";
import cors from "cors";

const app =  express();
const host = process.env.HOST;

import router from "./routes";
import corsOptions from "./config/corsOptions";

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cors(corsOptions));
app.use(router);

app.listen(host, async () => {
    console.log(`API running in http://localhost:${host}.`);
});
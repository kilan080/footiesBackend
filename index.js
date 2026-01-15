import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/database.js';
import routes from './src/routes/index.routes.js';


const app = express();

const PORT = 4000;

dotenv.config({
    path: './.env'
});

const corsOptions = {
    origin: "http://localhost:3000",
}
app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.sendStatus(200)
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);


connectDB();

app.listen(PORT, () => {
    console.log(`App is listening on  http://localhost:${PORT}`)
})

// export default app;
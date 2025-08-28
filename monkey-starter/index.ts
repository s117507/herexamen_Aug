import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import { connect } from "./database";
import { authRouter } from "./routers/authRouter";
import { secureMiddleware } from "./middleware/secureMiddleware";
import { monkeysRouter } from "./routers/monkeysRouter";
import session from "./session";
import { homeRouter } from "./routers/homeRouter";
import { speciesRouter } from "./routers/speciesRouter";

dotenv.config();

const app : Express = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.use(session);
app.set("port", process.env.PORT ?? 3000);

const SORT_FIELDS = ["id", "name", "description", "species_id", "country", "gender", "weight", "height", "year", "likes", "personality_trait"];

app.use(authRouter());
app.use("", homeRouter());
app.use("/monkeys", monkeysRouter());
app.use("/species", speciesRouter());


app.listen(app.get("port"), async() => {
    try {
        console.log("Server started on http://localhost:" + app.get("port"));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
    
});
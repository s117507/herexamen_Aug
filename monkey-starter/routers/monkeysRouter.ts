import { Router } from "express";
import { getAllMonkeys, getAllSpecies, getMonkeyById } from "../database";
import { Monkey } from "../types";
import { calculateMonkeyAge } from "../utils";
import { increaseMonkeyLikes } from "../database";

export function monkeysRouter() {
    const router = Router();
    const SORT_FIELDS = ["id", "name", "description", "species_id", "country", "gender", "weight", "height", "year", "likes", "personality_trait"];

    router.get("/", async(req, res) => {
        let q : string = typeof req.query.q === "string" ? req.query.q : "";
        const sortField = typeof req.query.sortField === "string" ? req.query.sortField : "name";
        const sortDirection = typeof req.query.sortDirection === "string" ? req.query.sortDirection : "asc";
        const monkeys: Monkey[] = await getAllMonkeys();
        res.render("monkeys", { 
            monkeys : monkeys,
            calculateMonkeyAge
        });
    });

    router.post("/:id/like", async(req, res) => {
        let id : number = parseInt(req.params.id);
        increaseMonkeyLikes(id);


        res.redirect("/monkeys");
    });

    return router;
}
import { Router } from "express";
import { getSpeciesById,getMonkeysBySpecies } from "../database";
import { Monkey, Species } from "../types";
import { monkeysRouter } from "./monkeysRouter";
import { calculateMonkeyAge } from "../utils";

export  function speciesRouter() {
    const router = Router();

    router.get("/:id", async(req, res) => {
        let id : number = parseInt(req.params.id);
        let species : Species | null = await getSpeciesById(id);
        let monkeys : Monkey[] = await getMonkeysBySpecies(id);
        console.log(species?.name);
        res.render("species", {
            species: species,
            monkeys: monkeys,
            calculateMonkeyAge
        });
    });

    return router;
}
import { Router } from "express";

export function monkeysRouter() {
    const router = Router();
    const SORT_FIELDS = ["id", "name", "description", "species_id", "country", "gender", "weight", "height", "year", "likes", "personality_trait"];

    router.get("/", async(req, res) => {
        res.render("monkeys", { });
    });

    router.post("/:id/like", async(req, res) => {
        res.redirect("/monkeys");
    });

    return router;
}
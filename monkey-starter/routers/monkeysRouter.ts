import { Router } from "express";

export function monkeysRouter() {
    const router = Router();

    router.get("/", async(req, res) => {
        res.render("monkeys", { });
    });

    router.post("/:id/like", async(req, res) => {
        res.redirect("/monkeys");
    });

    return router;
}
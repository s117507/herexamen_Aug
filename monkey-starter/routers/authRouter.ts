import e, { Router } from "express";
import { login } from "../database";
import { User } from "../types";

export function authRouter() {
    const router = Router();

    router.get("/login", async(req, res) => {
        res.render("login");
    });

    router.post("/login", async(req, res) => {
    const username : string = req.body.username;
    const pincode : string = req.body.pincode;
    try {
        let user : User = await login(username, pincode);
        req.session.user = user;
        res.redirect("/")
    } catch (e : any) {
        res.redirect("/login");
    }
    });

    router.post("/logout", (req, res) => {  
        res.redirect("/login");
    });

    return router;
}
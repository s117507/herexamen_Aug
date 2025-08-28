import { MongoClient, SortDirection } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

export const client = new MongoClient(process.env.CONNECTION_STRING || "mongodb://localhost:27017");

export const SALT_ROUNDS = 10;

async function exit() {
    try {
        await client.close();
        console.log("Disconnected from database");
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}

export async function getAllUsers() {
    return [];
}

export async function getAllSpecies() {
    return [];
}

export async function getSpeciesById(id: string) {
    return null;
}

export async function getAllMonkeys(sortField: string, sortDirection: SortDirection, q: string) {
    return [];
}

export async function getMonkeysBySpecies(id: number) {
    return [];
}

export async function getMonkeyById(id: number) {
    return null;
}

export async function increaseMonkeyLikes(id: number) {
    
}

export async function login(username: string, pincode: string) {
    return null;
}

async function seedUsers() {
    
}

async function seedSpecies() {
    
}

async function seedMonkeys() {
    
}

export async function seedDatabase() {
    await seedUsers();
    await seedSpecies();
    await seedMonkeys();
}

export async function connect() {
    await client.connect();
    await seedDatabase();
    console.log("Connected to database");
    process.on("SIGINT", exit);
}
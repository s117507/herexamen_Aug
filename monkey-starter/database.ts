import { MongoClient, SortDirection, Collection } from "mongodb";
import { User, Monkey, Species } from "./types";
import bcrypt from 'bcrypt';
import dotenv from "dotenv";
dotenv.config();

export const client = new MongoClient(process.env.MONGODB_URI || "mongodb://localhost:27017");

export const userCollection : Collection<User> = client.db("herex").collection<User>("users");
export const monkeyCollection : Collection<Monkey> = client.db("herex").collection<Monkey>("monkeys");
export const speciesCollection : Collection<Species> = client.db("herex").collection<Species>("species");

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
    return await userCollection.find({}).toArray();
}

export async function getAllSpecies() {
    return await speciesCollection.find({}).toArray();
}

export async function getSpeciesById(id: number) {
    return await speciesCollection.findOne<Species>({id: id});
}

export async function getAllMonkeys() {
    return await monkeyCollection.find({}).toArray();
}

export async function getMonkeysBySpecies(id: number) {
    return await monkeyCollection.find<Monkey>({species_id: id}).toArray();
}

export async function getMonkeyById(id: number) {
    return await monkeyCollection.findOne<Monkey>({id : id});
}

export async function increaseMonkeyLikes(id: number) {
    /*
    const monkey = await monkeyCollection.findOne<Monkey>({id : id});
    let liker = monkey?.likes;
    let likerr = liker + 1;
    

    const result = await monkeyCollection.updateOne({ id: id }, { $set: { likes: } });
    return ;*/
}

export async function login(username: string, pincode: string) {
    return null;
}

async function seedUsers() {
        const users : User[] = await getAllUsers();
    if (users.length === 0) {
        console.log("Database is empty, loading users from API")
        const response = await fetch("https://raw.githubusercontent.com/similonap/json/refs/heads/master/monkeys/users.json");
        const users : User[] = await response.json();

        for (const u of users) {
            u.password = await bcrypt.hash(u.password, SALT_ROUNDS)
        }

        await userCollection.insertMany(users);
        console.log(`Added ${users.length} users`)
    } else {
        console.log(`Found ${users.length} users.`)
    }
}

async function seedSpecies() {
    const species : Species[] = await getAllSpecies();
    if (species.length === 0) {
        console.log(`Database empty, getting species from API`)
        const response = await fetch("https://raw.githubusercontent.com/similonap/json/refs/heads/master/monkeys/species.json")
        const species : Species[] = await response.json();
        await speciesCollection.insertMany(species);
        console.log(`Added ${species.length} species.`)
    } else {
        console.log(`Found ${species.length} species.`)
    }
}

async function seedMonkeys() {
    const monkeys : Monkey[] = await getAllMonkeys();
    if (monkeys.length === 0) {
        console.log(`database empty loading monkeys`)
        const response = await fetch ("https://raw.githubusercontent.com/similonap/json/refs/heads/master/monkeys/monkeys.json")
        const monkeys : Monkey[] = await response.json();

        const allSpecies :Species[] = await getAllSpecies();

        for (const monkey of monkeys) {
            const species = allSpecies.find(s => s.id === monkey.species_id)
            monkey.species = species;
        }

        await monkeyCollection.insertMany(monkeys)
        console.log(`Added ${monkeys.length} monkeys.`)
    } else {
        console.log(`found ${monkeys.length} monkeys.`)
    }
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
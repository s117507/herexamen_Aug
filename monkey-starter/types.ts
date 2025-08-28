export interface Monkey {
    id: number;
    name: string;
    description: string;
    species_id: number;
    species?: Species;
    country: string;
    gender: string;
    weight: number;
    height: number;
    year: number;
    likes: number;
    personality_trait: string;
    image: string;
}

export type EndangermentStatus =
  | 'EX'  // Extinct
  | 'EW'  // Extinct in the Wild
  | 'CR'  // Critically Endangered
  | 'EN'  // Endangered
  | 'VU'  // Vulnerable
  | 'NT'  // Near Threatened
  | 'LC'; // Least Concern

export interface groupTolerance {
    minGroupSize: number;
    maxGroupSize: number;
}

export interface Species {
    id: number;
    name: string;
    habitatType: string;
    diet: string[];
    endangermentStatus: EndangermentStatus;
    groupTolerance: groupTolerance;
    image: string;
    description: string;

}

export interface User {
    id: number;
    username: string;
    fullname: string;
    password: string;
    avatar: string;
}

export interface FlashMessage {
    type: "error" | "success"
    message: string;
}
import { HeroI } from "./hero.interface";

export interface SearchI{
    value:string;
    results: Array<HeroI>
}
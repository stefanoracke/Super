export interface HeroI{
    name: string;
    image: {url:string};
    id: string;
    powerstats: {
        intelligence: string;        
        strength: string;
        speed: string;
        durability: string;
        power: string;
        combat: string;
    };
    biography:{
        
        aliases: any;
    }
    appearance:{
        height: Array<string>;
        weight: Array<string>;
        eye_color: string;
        hair_color: string;
    }
    work:{
        occupation: string;
        base: string;
    }
    results: Array<HeroI>

}
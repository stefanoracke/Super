import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Router } from '@angular/router';


import { HeroI } from 'src/app/models/hero.interface';
import { TheTeamI } from 'src/app/models/theteam.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {

  public superHeroList:Array<any> = [];
  
  hero1!:HeroI;
  hero2!:HeroI;
  hero3!:HeroI;
  hero4!:HeroI;
  hero5!:HeroI;
  hero6!:HeroI;
  theTeam:HeroI[] = [];

  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.getToken();
    
    this.api.getAllHeroes(226).subscribe(data=>{
      this.hero1 = data;
      localStorage.setItem("hero1",JSON.stringify(data))
    })    
    
    this.api.getAllHeroes(196).subscribe(data=>{
      this.hero2 = data;
      localStorage.setItem("hero2",JSON.stringify(data))
    })
    this.api.getAllHeroes(732).subscribe(data=>{
      this.hero3 = data;
      localStorage.setItem("hero3",JSON.stringify(data))
    })
    this.api.getAllHeroes(659).subscribe(data=>{
      this.hero4 = data;
      localStorage.setItem("hero4",JSON.stringify(data))
    })
    this.api.getAllHeroes(620).subscribe(data=>{
      this.hero5 = data;
      localStorage.setItem("hero5",JSON.stringify(data))
    })
    this.api.getAllHeroes(547).subscribe(data=>{
      this.hero6 = data;
      localStorage.setItem("hero6",JSON.stringify(data))
      
    })
    
    this.getTheTeam();
    console.log(this.theTeam[0])
  }

  getTheTeam(){
    let heros1 = JSON.parse(localStorage.getItem("hero1") || '{}');
    let heros2 = JSON.parse(localStorage.getItem("hero2") || '{}');
    let heros3 = JSON.parse(localStorage.getItem("hero3") || '{}');
    let heros4 = JSON.parse(localStorage.getItem("hero4") || '{}');
    let heros5 = JSON.parse(localStorage.getItem("hero5") || '{}');
    let heros6 = JSON.parse(localStorage.getItem("hero6") || '{}');

    this.theTeam = [heros1,heros2,heros3,heros4,heros5,heros6]

    localStorage.setItem("theteam",JSON.stringify(this.theTeam))
    console.log(this.theTeam);

  }

  routerInfo(id:number){
    let ruta = "heroinfo/" + id
    this.router.navigate([ruta]);
  }

  addHerotoList(n:number,list:Array<any>){
    this.api.getAllHeroes(n).subscribe(data=>{
      list.push(data);
    })
  }

  getToken(){
    if(localStorage.getItem("token")== null){
      this.router.navigate(["login"])
    }
  }
}

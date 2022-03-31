import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HeroI } from 'src/app/models/hero.interface';

@Component({
  selector: 'app-hero-info',
  templateUrl: './hero-info.component.html',
  styleUrls: ['./hero-info.component.css']
})
export class HeroInfoComponent implements OnInit {
  theTeam:HeroI[] = [];
  hero!:HeroI
  
  constructor(private router:Router,private ruta:ActivatedRoute,) { 
    
  }

  ngOnInit(): void {
    this.getToken();
    this.getTheTeam();
    this.ruta.params.subscribe(params=>{
      console.log(params['id'])
      this.hero = this.theTeam[params['id']]
      console.log(this.hero)
    })
  }

  getToken(){
    if(localStorage.getItem("token")== null){
      this.router.navigate(["login"])
    }
  }

  getTheTeam(){
    this.theTeam = JSON.parse(localStorage.getItem("theteam")|| "{}")
  }

}

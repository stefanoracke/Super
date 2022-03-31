import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroI } from 'src/app/models/hero.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { StateI } from 'src/app/models/stat.interface';

@Component({
  selector: 'app-theteam',
  templateUrl: './theteam.component.html',
  styleUrls: ['./theteam.component.css']
})
export class TheteamComponent implements OnInit {

  theTeam:HeroI[] = [];
  teampower:any = 0;
  teamint:any = 0;
  teamstr:any = 0;
  teamdurability:any = 0;
  teamCombat:any = 0;
  teamSpeed:any = 0;
  average:Array<StateI> = [];

  constructor(private router :Router, ) { }

  ngOnInit(): void {
    this.getToken();
    this.getTheTeam();
    
    this.getAverageStats(this.theTeam);
    this.createAverageObject();
    
  }

  getTheTeam(){
    this.theTeam = JSON.parse(localStorage.getItem("theteam")|| "{}")
  }

  powerplus(array:Array<HeroI>){
    let n = 0;
    array.forEach(element => {
      n += parseInt(element.powerstats.power);
    });
    this.teampower = Math.round(n/array.length);
  }
  intplus(array:Array<HeroI>){
    let n = 0;
    array.forEach(element => {
      n += parseInt(element.powerstats.intelligence);
    });
    this.teamint = Math.round(n/array.length);
  }
  strplus(array:Array<HeroI>){
    let n = 0;
    array.forEach(element => {
      n += parseInt(element.powerstats.strength);
    });
    this.teamstr = Math.round(n/array.length);
  }
  speedplus(array:Array<HeroI>){
    let n = 0;
    array.forEach(element => {
      n += parseInt(element.powerstats.speed);
    });
    this.teamSpeed = Math.round(n/array.length);
  }
  durplus(array:Array<HeroI>){
    let n = 0;
    array.forEach(element => {
      n += parseInt(element.powerstats.durability);
    });
    this.teamdurability = Math.round(n/array.length);
  }
  combatplus(array:Array<HeroI>){
    let n = 0;
    array.forEach(element => {
      n += parseInt(element.powerstats.combat);
    });
    this.teamCombat = Math.round(n/array.length);
    
  }

  getAverageStats(array:Array<HeroI>){
    this.powerplus(array);
    this.combatplus(array);
    this.speedplus(array);
    this.intplus(array);
    this.durplus(array);
    this.strplus(array);
  }

  createAverageObject(){
    this.average = [{name:"Power",value:this.teampower},{name:"Combat",value:this.teamCombat},{name:"Speed",value:this.teamSpeed},
  {name:"Intelligence",value:this.teamint},{name:"Durability",value:this.teamdurability},{name:"Strength",value:this.teamstr}]

    
  }

  getToken(){
    if(localStorage.getItem("token")== null){
      this.router.navigate(["login"])
    }
  }

}

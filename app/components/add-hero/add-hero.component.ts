import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { HeroI } from 'src/app/models/hero.interface';
import { SearchI } from 'src/app/models/search.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.css']
})
export class AddHeroComponent implements OnInit {
  public getHeros:Array<HeroI> = [];
  theTeam:HeroI[] = [];

  form = new FormGroup({
    value : new FormControl ('', Validators.required)
  })

  constructor(private router :Router, private api:ApiService) { }

  ngOnInit(): void {
    this.getToken();
    this.getResults();
    this.getTheTeam();

  }

  getToken(){
    if(localStorage.getItem("token")== null){
      this.router.navigate(["login"])
    }
  }

  getTheTeam(){
    this.theTeam = JSON.parse(localStorage.getItem("theteam")|| "{}")
  }

  addtoTheTeam(id:number){
    this.theTeam.push(this.getHeros[id]);
    localStorage.setItem("theteam",JSON.stringify(this.theTeam))
  }

  getForm(form:SearchI){
    this.api.searchHero(form.value).subscribe(data=>{
      
      

      localStorage.setItem("herosToAdd",JSON.stringify(data.results))

      window.location.reload();
      
    })
    
  }
  reloadCurrentPage() {
    window.location.reload();
   }

  getResults(){
    this.getHeros = JSON.parse(localStorage.getItem("herosToAdd") || '{}');
  }
}

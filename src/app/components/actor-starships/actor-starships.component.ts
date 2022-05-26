import { ServiceService } from 'src/app/service.service';
import { Component, Input, OnInit } from '@angular/core';
import { Actor, StarShip } from 'src/app/api-interface';

@Component({
  selector: 'app-actor-starships',
  templateUrl: './actor-starships.component.html',
  styleUrls: ['./actor-starships.component.css']
})
export class ActorStarshipsComponent implements OnInit {

  @Input() actor!: Actor;
  starships: StarShip[] = [];

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    const regex = /(\d+)/g;
    this.actor.starships.map((starship: StarShip) => {
      const idInUrl: RegExpMatchArray | null = starship.match(regex);
      const id: number = parseInt(idInUrl![0]);
      this.service.getStarship(id).subscribe((resp) => {
        this.starships.push(resp)
      });
    })
  }

}

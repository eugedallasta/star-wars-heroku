import { ServiceService } from 'src/app/service.service';
import { Component, Input, OnInit } from '@angular/core';
import { Actor, Film } from 'src/app/api-interface';

@Component({
  selector: 'app-actor-films',
  templateUrl: './actor-films.component.html',
  styleUrls: ['./actor-films.component.css']
})
export class ActorFilmsComponent implements OnInit {

  @Input() actor!: Actor;
  movies: Film[] = [];

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    const regex = /(\d+)/g;
    this.actor.films.map((film: Film) => {
      const idInUrl: RegExpMatchArray | null = film.match(regex);
      const id: number = parseInt(idInUrl![0]);
      this.service.getFilms(id).subscribe((resp) => {
        this.movies.push(resp)
      });
    })
  }

}

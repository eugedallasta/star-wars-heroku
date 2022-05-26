import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Film, StarShip } from 'src/app/api-interface';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  @Input() ship!: StarShip;
  films: Film[] = [];

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    const regex = /(\d+)/g;
    this.ship.films.map((ship) => {
      const idInUrl: RegExpMatchArray | null = ship.match(regex);
      const id: number = parseInt(idInUrl![0]);
      this.service.getFilms(id).subscribe((resp) => {
        this.films.push(resp)
      });
    })
  }

}

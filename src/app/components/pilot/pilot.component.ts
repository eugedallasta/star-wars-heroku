import { ServiceService } from './../../service.service';
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { StarShip, Pilot } from 'src/app/api-interface';

@Component({
  selector: 'app-pilot',
  templateUrl: './pilot.component.html',
  styleUrls: ['./pilot.component.css']
})
export class PilotComponent implements OnInit {
  @Input() ship!: StarShip;
  pilots: Pilot[] = [];

  constructor(private location: Location, private service: ServiceService) { }

  ngOnInit(): void {
    this.deletePilot();
    const regex = /(\d+)/g;
    this.ship.pilots.map((pilot: Pilot) => {
      const idInUrl: RegExpMatchArray | null = pilot.match(regex);
      const id: number = parseInt(idInUrl![0]);
      this.service.getPilot(id).subscribe((resp) => {
        this.pilots.push(resp)

      });
      console.log('pilotos---->', this.pilots);

    })
  }

  goBackButton(): void {
    this.location.back();
  }

  deletePilot() {
    let numReg: number = this.pilots.length;
    if (numReg > 0) {
      this.pilots.splice(0, numReg);
    }
  }

}

import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Actor } from 'src/app/api-interface';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {

  actorslist: Actor[] = [];
  actor!: Actor;

  next: null = null;
  private pageNum: number = 1;
  private hideScrollHeight: number = 200;
  private showScrollHeight: number = 400;
  showGoUpButton = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private service: ServiceService,) { }

  ngOnInit(): void {
    this.getActors();
  }
  getActors(page = 1): void {
    this.service.getActorsFromApi(this.pageNum).pipe(take(1))
      .subscribe((response: any) => {
        const { next, results } = response
        this.actorslist = [...this.actorslist, ...results]
        this.next = next
      });
  }
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const yOffSet = window.pageYOffset;
    if ((yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if (this.showGoUpButton && (yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }
  onScrollDown(): void {
    if (this.next) {
      this.pageNum++;
      this.getActors();
    }
  }
  onScrollTop(): void {
    this.document.body.scrollTop = 0; //Safari
    this.document.documentElement.scrollTop = 0;//Others
  }
}

























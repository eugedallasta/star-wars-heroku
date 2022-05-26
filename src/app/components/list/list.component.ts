import { SpinnerService } from './../../services/spinner.service';
import { StarShip } from './../../api-interface';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ServiceService } from 'src/app/service.service';
import { take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  shipslist: StarShip[] = [];
  next: null = null;
  private pageNum: number = 1;
  private hideScrollHeight: number = 200;
  private showScrollHeight: number = 400;
  showGoUpButton = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private service: ServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: SpinnerService,

  ) { }

  ngOnInit(): void {
    this.getShips();
  }

  getShips(page = 1): void {
    this.service.getDataFromApi(this.pageNum).pipe(take(1))
      .subscribe((response: any) => {
        const { next, results } = response
        this.shipslist = [...this.shipslist, ...results]
        this.next = next

      });
  }


  goToDetail(url: string) {
    const idInUrl: RegExpMatchArray | null = url.match(/(\d+)/g);
    if (idInUrl) {
      const id: number = parseInt(idInUrl[0].replace('/', ''));
      this.router.navigate(['/starships/', id]);
    }
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
      this.getShips();
    }
  }

  onScrollTop(): void {
    this.document.body.scrollTop = 0; //Safari
    this.document.documentElement.scrollTop = 0;//Others
  }

}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  constructor(private route: ActivatedRoute) { }
  pos:any={"top": 55};
  ngOnInit() {
    window.scroll(0, 0);
  }

  gotoElement(f) {
    this.route.fragment.subscribe(f => {
      const element = document.querySelector("#" + f)
      if (element) element.scrollIntoView(true);
    })
  }

  goToHome() {
    window.scrollTo(0, 0)
  }

}

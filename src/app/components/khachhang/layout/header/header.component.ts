import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authService/authentication.service';
import { CartService } from 'src/app/services/danhmuc/cart.service';
import { DataService } from 'src/app/services/share/data.share';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  drop1 = false;
  constructor(
    private user: AuthenticationService,
    private router: Router,
    private c: CartService,
    public up:DataService
  ) {}
  name = '';
  totalCart = 0;
  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.name = JSON.parse(localStorage.getItem('user'))[0].hoTen;
      this.GetCount();
    }
  }
  logout() {
    localStorage.clear();
    this.router.navigateByUrl("../shop")
    location.reload();
  }

  goto(go) {
    this.router.navigateByUrl('/shop/' + go);
  }
  GetCount(){
    var t = this.user.getUserLocal();
    if (t) {
      this.c.ShowShoppingCart(t.id).subscribe((res:any)=>{
        this.up.Value(Number(res.length));
      })
    }
  }
}

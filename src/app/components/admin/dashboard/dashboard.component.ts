import { Location } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { Configuration } from 'ng-material-multilevel-menu';
import { RoleMenuService } from 'src/app/services/danhmuc/rolemenu.service';
import { Role } from 'src/app/services/ERole';
declare const $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private _location: Location, private UserRoleMenu: RoleMenuService, private route: ActivatedRoute) { }
  isCollapsed = false;
  IdRole = JSON.parse(localStorage.getItem("user"))[0].roleId;
  dataMenu: any;
  showScrollTop = false;
  config: Configuration = {
    paddingAtStart: true,
    interfaceWithRoute: false,
    classname: 'my-custom-class',
    listBackgroundColor: `3445b4`,
    fontColor: `#fffefa`,
    backgroundColor: `#3445b4`,
    selectedListFontColor: `#f0e9cc`,
    highlightOnSelect: true,
    collapseOnSelect: true,
    useDividers: false,
    rtlLayout: false,

  };
  @ViewChild('target') private myScrollContainer: ElementRef;
  appitems = [
    {
      label: 'Item 1 (with Font awesome icon)',
      faIcon: 'fab fa-500px',
      items: [
        {
          label: 'Item 1.1',
          link: '/item-1-1',
          faIcon: 'fab fa-accusoft'
        },
        {
          label: 'Item 1.2',
          faIcon: 'fab fa-accessible-icon',
        }
      ]
    },
  ];
  @HostListener('window:scroll', ['$event']) onScrollEvent(){
    if (window.scrollY > 130) {
      this.showScrollTop = true;
    }
    else{
      this.showScrollTop = false;
    }
  }
  ScrollTop(){
    window.scrollTo(0,0);
  }
  ngOnInit(): void {
    if (!localStorage.getItem("menu") || localStorage.getItem("menu") == null ) {
      this.getMenu();
    }
    else{
      this.dataMenu = JSON.parse(localStorage.getItem("menu"));

    };
    var fullHeight = function () {
      $('.js-fullheight').css('height', $(window).height());
      $(window).resize(function () {
        $('.js-fullheight').css('height', $(window).height());
      });

    };
    fullHeight();

    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
    });


    //
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user[0].role == Role.KhachHang) {
        this._location.back();
      }
    }
  }
  selectedItem(event) {

  }
  menuItems: any[];
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  getMenu() {
    this.UserRoleMenu.getRoleMenu(this.IdRole).subscribe((res: any) => {
      this.dataMenu = res;
      localStorage.setItem("menu", JSON.stringify(res));
    });
  }
}

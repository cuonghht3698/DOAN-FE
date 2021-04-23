import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BlogService } from 'src/app/services/danhmuc/blog.service';
import { SanPhamService } from 'src/app/services/danhmuc/sanpham.service';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';
import { TudienService } from 'src/app/services/danhmuc/tudien.service';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  constructor(
    private sp: SanPhamService,
    private blog: BlogService,
    private toarst: ToastrService,
    private route: ActivatedRoute,
    private cm:TudienService
  ) {}
  public Editor = ClassicEditor;
  check = false;
  ngOnInit(): void {
    this.getProduct();
    this.route.queryParams.subscribe((res) => {
      if (res.id) {
        this.check = true;
        this.GetById(res.id);
      }
    });
  }

  config: CKEditor5.Config = {
    toolbar: [
      'undo',
      'redo',
      '|',
      'heading',
      'fontFamily',
      'fontSize',
      '|',
      'bold',
      'italic',
      'underline',
      'fontColor',
      'fontBackgroundColor',
      'highlight',
      '|',
      'link',
      'CKFinder',
      'imageUpload',
      'mediaEmbed',
      '|',
      'alignment',
      'bulletedList',
      'numberedList',
      '|',
      'indent',
      'outdent',
      '|',
      'insertTable',
      'blockQuote',
      'specialCharacters',
    ],
    language: 'vi',
    image: {
      toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
    },
  };
  dsSanPham: any;
  dataBlog = {
    Id: null,
    TieuDe: '',
    NoiDung: '',
    Link: '',
    Active: true,
    IdSanPham: null,
  };
  baseUrl = environment.ApiUrl + 'anh/get/';
  states = [];
  search = '';



  getProduct() {
    this.sp.GetByName(this.search,"","").subscribe((res: any) => {
      this.states = res;
      this.filteredStates = this.stateCtrl.valueChanges.pipe(
        startWith(''),
        map((state) =>
          state ? this._filterStates(state) : this.states.slice()
        )
      );
    });
  }
  stateCtrl = new FormControl();
  filteredStates: Observable<any>;
  private _filterStates(value: string) {
    const filterValue = value.toLowerCase();
    return this.states.filter(
      (state) => state.ten.toLowerCase().indexOf(filterValue) === 0
    );
  }
  ChoseSp(item) {
    this.dataBlog.IdSanPham = item.id;
  }
  GetById(Id) {
    this.blog.getById(Id).subscribe((res: any) => {
      this.dataBlog = {
        Id: res.id,
        TieuDe: res.tieuDe,
        NoiDung: res.noiDung,
        Link: res.link,
        Active: res.active,
        IdSanPham: res.idSanPham,
      };

    });
  }

  replaceAll(string, search, replace) {
    return string.split(search).join(replace);
  }
  CreateOrUpdate() {
    this.dataBlog.NoiDung = this.replaceAll(
      this.dataBlog.NoiDung,
      '<img ',
      '<img style="width:100%" '
    );
    if (this.dataBlog.Id) {
      // update
      this.blog.Update(this.dataBlog).subscribe((res) => {
        this.toarst.success('Thao tác thành công', 'Thông báo');
      });
    } else {
      // create
      this.blog.Create(this.dataBlog).subscribe((res) => {
        this.toarst.success('Thao tác thành công', 'Thông báo');
      });
    }
  }
}

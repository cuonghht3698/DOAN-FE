import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'doctien'})
export class DocTienPipe implements PipeTransform {
  transform(x: string): any {
    return this.DocTien(x);
  }


  mangso = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
  private dochangchuc(so:any, daydu:any) {
      var chuoi = "";
      var chuc = Math.floor(so / 10);
      var donvi = so % 10;
      if (chuc > 1) {
          chuoi = " " + this.mangso[chuc] + " mươi";
          if (donvi == 1) {
              chuoi += " mốt";
          }
      } else if (chuc == 1) {
          chuoi = " mười";
          if (donvi == 1) {
              chuoi += " một";
          }
      } else if (daydu && donvi > 0) {
          chuoi = " lẻ";
      }
      if (donvi == 5 && chuc > 1) {
          chuoi += " lăm";
      } else if (donvi > 1 || (donvi == 1 && chuc == 0)) {
          chuoi += " " + this.mangso[donvi];
      }
      return chuoi;
  }
  private docblock(so:any, daydu:any) {
      var chuoi = "";
      var tram = Math.floor(so / 100);
      so = so % 100;
      if (daydu || tram > 0) {
          chuoi = " " + this.mangso[tram] + " trăm";
          chuoi += this.dochangchuc(so, true);
      } else {
          chuoi = this.dochangchuc(so, false);
      }
      return chuoi;
  }
  private dochangtrieu(so:any, daydu:any) {
      var chuoi = "";
      var trieu = Math.floor(so / 1000000);
      so = so % 1000000;
      if (trieu > 0) {
          chuoi = this.docblock(trieu, daydu) + " triệu";
          daydu = true;
      }
      var nghin = Math.floor(so / 1000);
      so = so % 1000;
      if (nghin > 0) {
          chuoi += this.docblock(nghin, daydu) + " nghìn";
          daydu = true;
      }
      if (so > 0) {
          chuoi += this.docblock(so, daydu);
      }
      return chuoi;
  }
  DocTien(so:any) {
      if (so == 0) return this.mangso[0];
      var chuoi = "", hauto = "";
      do {
          var ty = so % 1000000000;
          so = Math.floor(so / 1000000000);
          if (so > 0) {
              chuoi = this.dochangtrieu(ty, true) + hauto + chuoi;
          } else {
              chuoi = this.dochangtrieu(ty, false) + hauto + chuoi;
          }
          hauto = " tỷ";
      } while (so > 0);

      chuoi = chuoi.charAt(1).toUpperCase() + chuoi.slice(2);
      return chuoi;
  }
}

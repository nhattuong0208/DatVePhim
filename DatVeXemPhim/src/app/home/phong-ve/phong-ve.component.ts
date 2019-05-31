import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuanLyPhimService } from "./../../../_core/services/quan-ly-phim.service";
import { GheComponent } from './ghe/ghe.component';

@Component({
  selector: 'app-phong-ve',
  templateUrl: './phong-ve.component.html',
  styleUrls: ['./phong-ve.component.scss']
})
export class PhongVeComponent implements OnInit {
  @ViewChildren(GheComponent) tagListGhe: QueryList<GheComponent>;

  public maLichChieu: any;
  public danhSachGhe: any;
  public dsGheDaDat = [];
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private quanLyPhimService: QuanLyPhimService
  ) { }

  ngOnInit() {
    this.getParams();
    this.getChiTietPhongVe();
  }

  getParams(){
    this.maLichChieu = this.activatedRoute.snapshot.paramMap.get("maLichChieu");
  }

  getChiTietPhongVe(){
    this.quanLyPhimService.chiTietPhongVe(this.maLichChieu).subscribe((result:any)=>{
      this.danhSachGhe = result.DanhSachGhe;
    })
  }

  datGhe(ghe){
    if(ghe.trangThai){
      this.dsGheDaDat.push(ghe.ghe);
    }else{
      let vitri;
      this.dsGheDaDat.map((item, index) =>{
        if(ghe.ghe.SoGhe === item.SoGhe){
            vitri = index;
        }
      });
      this.dsGheDaDat.splice(vitri, 1);
    }
  }

  huyGhe(ghe, index){
    let viTri = this.dsGheDaDat.findIndex(item => item.MaGhe === ghe.MaGhe);
    this.dsGheDaDat.splice(index, 1);
    this.tagListGhe.map(item => {
      if(item.ghe.MaGhe === ghe.MaGhe){
        item.trangThaiChon = false;
      }
    });
  }

}

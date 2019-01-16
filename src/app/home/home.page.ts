import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  products: Product[] = [];
  constructor(
    private api: ApiService,
    private loadingController: LoadingController,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  async getProducts() {
    const loading = await this.loadingController.create({
      message: 'Loading ...'
    });
    await loading.present();

    await this.api.getProducts()
      .subscribe(res => {
        this.products = res;
        console.log(this.products);
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.products, event.previousIndex, event.currentIndex);
  }
}

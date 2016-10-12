import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import {Http, Headers, RequestOptions} from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Image } from './image';

@Component({
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(private http:Http, public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    let options = new RequestOptions({ headers: headers });

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    let imagesObservable = this.http.get('https://pictu-r.herokuapp.com/api/v1/users/foo/pictures', options)
      .map(data => data.json())
      .map(imageDataList => {
        console.log(imageDataList);
        imageDataList.map(imageData => new Image(imageData));
      })
        .subscribe(_imageList => {
          console.log('_imageList',_imageList);
          let imageList;
          imageList = _imageList;

          //this.items = [];
          for(let i = 0; i < imageList.length; i++) {
            this.items.push({
              title: 'Item ' + i,
              note: 'This is item #' + i,
              icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
          }

        });

  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}

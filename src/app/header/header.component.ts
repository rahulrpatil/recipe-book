import {Component} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {HttpResponse} from '@angular/common/http';

@Component({
  templateUrl: './header.component.html',
  selector: 'app-header'
})

export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService) {}
  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response: HttpResponse) => {
                console.log(response)
        }
      )
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardComponent } from './components/card/card.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomePageComponent,
    SearchBoxComponent,
    SearchBoxComponent,
    CardListComponent,
    CardListComponent,
    CardComponent,
  ],
  exports: [HomePageComponent],
  imports: [CommonModule, SharedModule],
})
export class GifsModule {}

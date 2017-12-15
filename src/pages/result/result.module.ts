import { RoundPipe } from './round-pipe';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultPage } from './result';

@NgModule({
  declarations: [
    ResultPage,
    RoundPipe
  ],
  imports: [
    IonicPageModule.forChild(ResultPage),
  ],
})
export class ResultPageModule {}

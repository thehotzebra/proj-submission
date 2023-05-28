import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewItemComponent } from './new-item/new-item.component';
import { SummaryComponent } from './summary/summary.component';
import { AdvisorComponent } from './advisor/advisor.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'newitem', component: NewItemComponent},
  {path: 'summary', component: SummaryComponent},
  {path: 'advisor', component: AdvisorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

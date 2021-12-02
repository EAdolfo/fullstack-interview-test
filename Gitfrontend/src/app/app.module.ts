import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavigatorComponent } from './navigator/navigator.component';
import { BranchesComponent } from './branches/branches.component';
import { BranchesViewComponent } from './branches/branches-view/branches-view.component';
import { CommitViewComponent } from './branches/branches-view/commit-view/commit-view.component';
import { PullRequestsComponent } from './pull-requests/pull-requests.component';
import { PullRequestsCreateViewComponent } from './pull-requests/pull-requests-create-view/pull-requests-create-view.component';
import { ListComponent } from './shared/list/list.component';

import { ApiService} from './services/api.service';
import { UtilService } from './services/util.service';
import { DetailComponent } from './shared/detail/detail.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    BranchesComponent,
    BranchesViewComponent,
    CommitViewComponent,
    PullRequestsComponent,
    PullRequestsCreateViewComponent,
    ListComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiService,
    UtilService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

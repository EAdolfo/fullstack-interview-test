import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BranchesComponent } from './branches/branches.component';
import { BranchesViewComponent } from './branches/branches-view/branches-view.component';
import { CommitViewComponent } from './branches/branches-view/commit-view/commit-view.component';
import { PullRequestsComponent } from './pull-requests/pull-requests.component';
import { PullRequestsCreateViewComponent } from './pull-requests/pull-requests-create-view/pull-requests-create-view.component';

const routes: Routes = [
  {
    path: 'branches',
    component: BranchesComponent
  }, {
    path: 'branches/view/:id',
    component: BranchesViewComponent
  }, {
    path: 'commit/view/:id',
    component: CommitViewComponent
  }, {
    path: 'pull-requests',
    component: PullRequestsComponent
  }, {
    path: 'pull-requests/create',
    component: PullRequestsCreateViewComponent
  }, {
    path: '**',
    redirectTo: 'branches',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

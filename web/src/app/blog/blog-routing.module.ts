import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogPageComponent } from './containers/blog-page/blog-page.component';
import { LoadPostsResolver } from './guards/load-posts.resolver';

const routes: Routes = [
	{
		children: [
			{ path: ':name', component: BlogPageComponent, resolve: { loadPosts: LoadPostsResolver } },
		],
		path: 'blog',
	},
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(routes)],
})
export class BlogRoutingModule {}

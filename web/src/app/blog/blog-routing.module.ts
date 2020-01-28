import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogPageComponent } from './containers/blog-page/blog-page.component';
import { EditorPageComponent } from './containers/editor-page/editor-page.component';
import { LoadBiographyResolver } from './guards/load-biography.resolver';
import { LoadPostsResolver } from './guards/load-posts.resolver';

const routes: Routes = [
	{
		children: [
			{
				component: BlogPageComponent,
				path: ':name',
				resolve: { loadBio: LoadBiographyResolver, loadPosts: LoadPostsResolver },
			},
		],
		path: 'blog',
	},
	{ path: 'editor', component: EditorPageComponent },
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(routes)],
})
export class BlogRoutingModule {}

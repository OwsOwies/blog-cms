import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from '../material.module';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { BlogPageComponent } from './containers/blog-page/blog-page.component';
import { BlogEffects } from './effects/blog.effects';
import { LoadPostsResolver } from './guards/load-posts.resolver';
import { BlogRestService } from './services/blog.service';

@NgModule({
	declarations: [BlogPageComponent, BlogPostComponent],
	imports: [
		CommonModule,
		BlogRoutingModule,
		MaterialModule,
		ReactiveFormsModule,
		EffectsModule.forFeature([BlogEffects]),
	],
	providers: [BlogRestService, LoadPostsResolver],
})
export class BlogModule {}

import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { HeaderInterceptor } from './services/header.interceptor';
import { UserSearchService } from './services/user-search.service';
import { UserSearchComponent } from './user-search/user-search.component';

@NgModule({
  declarations: [UserSearchComponent],
  imports: [CommonModule, HttpClientModule, MaterialModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
    UserSearchService,
  ],
  exports: [UserSearchComponent],
})
export class UserSearchModule {}

import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { HttpServiceModule } from './shared/async-services/http.module';
import { LayoutComponent } from './layout/layout.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { LoginModule } from './modules/login/login.module';
import { JwtModule } from '@auth0/angular-jwt';
import { VideoDashboardComponent } from './modules/video-dashboard/video-dashboard.component';
import { VideoDashboardModule } from './modules/video-dashboard/video-dashboard.module';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LayoutComponent,
    VideoDashboardComponent,
  ],
  imports: [
    BrowserModule,
    HttpServiceModule.forRoot(),
    AngularMaterialModule,
    AppRoutingModule,
    SocialLoginModule,
    NgSelectModule, FormsModule,
    DashboardModule,
    VideoDashboardModule,
    LoginModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      },
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
export function tokenGetter() {
  return localStorage.getItem("access_token");
}

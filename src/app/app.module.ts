import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import { EntitiesComponent } from './entities/entities/entities.component';
import { ErrorComponent } from './error/error.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { ViewEditEntityComponent } from './entities/view-edit-entity/view-edit-entity.component';
import { SharedModule } from './shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { EntityState } from './shared/store/entity/entity.state';
import { UserState } from './shared/store/user/user.state';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    EntitiesComponent,
    ErrorComponent,
    ViewEditEntityComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([
      EntityState,
      UserState,
    ]),
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'kadium-web'),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}

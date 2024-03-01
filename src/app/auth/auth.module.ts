import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule, AuthRoutingModule],
    declarations: [AuthComponent]
})
export class AuthModule { }
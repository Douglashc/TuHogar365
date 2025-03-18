import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { WebMaterialModule } from 'app/webmaterial.module';

@Component({
  selector: 'app-page403',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    WebMaterialModule
  ],
  templateUrl: './page403.component.html',
  styleUrl: './page403.component.scss'
})
export class Page403Component {

}

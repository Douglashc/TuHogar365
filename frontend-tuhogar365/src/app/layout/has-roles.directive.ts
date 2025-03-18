import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { TokenStorageService } from '@core/authentication/token-storage.service';

@Directive({
  selector: '[appHasRoles]',
  standalone: true
})
export class HasRolesDirective {

  user: any;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private tokenStorageService: TokenStorageService
  ) { }

  @Input()
  set appHasRoles(val:any) {
    // debugger;
    if(val){

      this.user = this.tokenStorageService.getUser();
      val.forEach((data:any) => {
        if (this.user.rol.name === data) {
          this.viewContainer.createEmbeddedView(this.templateRef);
          return;
        }
        else if(data === this.user.nivel_id){
          this.viewContainer.createEmbeddedView(this.templateRef);
          return;
        }
      });
    }
    else{
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

}

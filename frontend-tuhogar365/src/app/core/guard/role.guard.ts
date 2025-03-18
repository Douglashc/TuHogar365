import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { TokenStorageService } from '@core/authentication/token-storage.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(private router: Router, private tokenStorage: TokenStorageService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const user = this.tokenStorage.getUser();
        console.log("USER DATOS GUARD: ", user);

        // Obtén los roles permitidos desde los datos de la ruta
        const roles = route.data['roles'] as Array<string>;

        // Si el rol del usuario está permitido, regresa true
        if (roles && roles.includes(user?.rol?.name)) {
            return true;
        }

        // Si el rol no es permitido, redirige o muestra un mensaje de acceso denegado
        this.router.navigate(['/dashboard/403']); // O redirige a una página de acceso denegado
        return false;
    }
}

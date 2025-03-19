<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder {
    public function run(): void {
        Role::create(['name' => 'administrador', 'display_name' => 'Administrador']);
        Role::create(['name' => 'lider', 'display_name' => 'Líder']);
        Role::create(['name' => 'empleado', 'display_name' => 'Empleado']);
    }
}

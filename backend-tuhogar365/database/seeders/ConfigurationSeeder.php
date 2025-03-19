<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;
use App\Models\Equipo;
use App\Models\Proyecto;
use App\Models\Tarea;
use App\Models\Notificacion;
use App\Models\Archivo;
use Faker\Factory as Faker;

class ConfigurationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call(RoleSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(EquipoSeeder::class);
        $this->call(UsuarioEquipoSeeder::class);
        $this->call(ProyectoSeeder::class);
        $this->call(TareaSeeder::class);
        //$this->call(NotificacionSeeder::class);
        $this->call(ArchivoSeeder::class);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Equipo;
use Illuminate\Support\Facades\DB;

class UsuarioEquipoSeeder extends Seeder {
    public function run(): void {
        // Obtener todos los empleados (rol_id = 3)
        $empleados = User::where('rol_id', 3)->get();

        // Obtener todos los equipos
        $equipos = Equipo::all();

        // Asignar empleados aleatoriamente a los equipos
        foreach ($empleados as $empleado) {
            // Seleccionar un equipo aleatorio
            $equipo = $equipos->random();

            // Insertar en la tabla pivot
            DB::table('usuario_equipo')->insert([
                'usuario_id' => $empleado->id,
                'equipo_id' => $equipo->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

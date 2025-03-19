<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Equipo;
use App\Models\User;

class EquipoSeeder extends Seeder {
    public function run(): void {
        // Obtener líderes disponibles (rol_id = 2)
        $leaders = User::where('rol_id', 2)->get();

        // Equipos con nombres, descripciones y líderes asignados
        $equipos = [
            ['nombre' => 'Equipo de Diseño', 'descripcion' => 'Encargado de la identidad visual y materiales gráficos.', 'lider_id' => $leaders[0]->id ?? null],
            ['nombre' => 'Equipo de Marketing', 'descripcion' => 'Gestión de estrategias de mercado y campañas publicitarias.', 'lider_id' => $leaders[1]->id ?? null],
            ['nombre' => 'Equipo de Desarrollo Web', 'descripcion' => 'Construcción y mantenimiento de plataformas digitales.', 'lider_id' => $leaders[2]->id ?? null],
            ['nombre' => 'Equipo de Soporte Técnico', 'descripcion' => 'Atención y resolución de problemas tecnológicos.', 'lider_id' => $leaders[3]->id ?? null],
            ['nombre' => 'Equipo de Innovación', 'descripcion' => 'Exploración y desarrollo de nuevas tecnologías.', 'lider_id' => $leaders[4]->id ?? null]
        ];

        // Crear equipos en la base de datos
        foreach ($equipos as $equipo) {
            Equipo::create([
                'nombre_equipo' => $equipo['nombre'],
                'descripcion' => $equipo['descripcion'],
                'lider_id' => $equipo['lider_id']
            ]);
        }
    }
}

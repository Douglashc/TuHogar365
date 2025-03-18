<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ConfigurationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Role::create([
            'name' => 'administrador',
            'display_name' => 'administrador',
        ]);
        \App\Models\Role::create([
            'name' => 'encargado',
            'display_name' => 'encargado',
        ]);

        $faker = Faker::create();
        $nombre = $faker->name();
        $apellido = $faker->lastname();

        \App\Models\User::factory()->create([
            'nombres' => $nombre,
            'apellidos' => $apellido,
            'nombre_completo' => $nombre . ' ' . $apellido,
            'username' => 'admin',
            'email' => 'test@example.com',
            'email_verified_at' => now(),
            'habilitado' => true,
            'password' => bcrypt('admin'), // password
        ]);

        // Crear clientes manualmente
        \App\Models\Cliente::create([
            'nombre' => 'Carlos',
            'apellido' => 'García',
            'telefono' => '555-1234',
            'tipo' => 'regular',
            'fecha_nacimiento' => '1980-05-15',
            'habilitado' => true,
            'direccion' => 'Calle 123, Cochabamba',
            'fecha_registro' => now(),
            'tipo_membresia' => 'normal',
        ]);

        \App\Models\Cliente::create([
            'nombre' => 'María',
            'apellido' => 'López',
            'telefono' => '555-5678',
            'tipo' => 'premium',
            'fecha_nacimiento' => '1992-11-23',
            'habilitado' => true,
            'direccion' => 'Av. Siempre Viva 742, Cochabamba',
            'fecha_registro' => now(),
            'tipo_membresia' => 'premium',
        ]);

        \App\Models\Cliente::create([
            'nombre' => 'Luis',
            'apellido' => 'Rodríguez',
            'telefono' => '555-8765',
            'tipo' => 'regular',
            'fecha_nacimiento' => '1985-07-12',
            'habilitado' => true,
            'direccion' => 'Zona Norte, Cochabamba',
            'fecha_registro' => now(),
            'tipo_membresia' => 'normal',
        ]);


        // Crear periodos manualmente
        \App\Models\Periodo::create([
            'fecha_inicio' => '2024-01-01',
            'fecha_final' => '2024-06-30',
            'descripcion' => 'Temporada Alta Verano',
        ]);

        \App\Models\Periodo::create([
            'fecha_inicio' => '2024-07-01',
            'fecha_final' => '2024-12-31',
            'descripcion' => 'Temporada Baja Invierno',
        ]);


        // Crear servicios manualmente
        \App\Models\Servicio::create([
            'nombre' => 'Piscina Recreativa',
            'responsable' => 'Juan Pérez',
            'habilitado' => true,
            'titulo' => 'Servicio de uso libre',
            'universidad_id' => 1, // Asume que existe una universidad con ID 1
            'periodo_id' => 1, // Temporada Alta Verano
        ]);

        \App\Models\Servicio::create([
            'nombre' => 'Clases de Natación',
            'responsable' => 'Ana González',
            'habilitado' => true,
            'titulo' => 'Clases para todas las edades',
            'universidad_id' => 1, // Asume que existe una universidad con ID 1
            'periodo_id' => 2, // Temporada Baja Invierno
        ]);


        // Crear reservas manualmente
        \App\Models\Reserva::create([
            'cliente_id' => 1, // Carlos García
            'servicio_id' => 1, // Piscina Recreativa
            'fecha_reserva' => '2024-05-20',
            'fecha_hora_inicio' => '2024-05-20 10:00:00',
            'fecha_hora_fin' => '2024-05-20 12:00:00',
        ]);

        \App\Models\Reserva::create([
            'cliente_id' => 2, // María López
            'servicio_id' => 2, // Clases de Natación
            'fecha_reserva' => '2024-07-10',
            'fecha_hora_inicio' => '2024-07-10 08:00:00',
            'fecha_hora_fin' => '2024-07-10 09:30:00',
        ]);

        \App\Models\Reserva::create([
            'cliente_id' => 3, // Luis Rodríguez
            'servicio_id' => 1, // Piscina Recreativa
            'fecha_reserva' => '2024-06-15',
            'fecha_hora_inicio' => '2024-06-15 14:00:00',
            'fecha_hora_fin' => '2024-06-15 16:00:00',
        ]);
    }
}

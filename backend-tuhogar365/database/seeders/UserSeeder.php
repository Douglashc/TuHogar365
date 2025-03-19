<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Faker\Factory as Faker;

class UserSeeder extends Seeder {
    public function run(): void {
        // Usuario admin
        User::create([
            'foto' => '',
            'nombres' => 'Admin',
            'apellidos' => 'Principal',
            'nombre_completo' => 'Admin Principal',
            'username' => 'admin',
            'email' => 'admin@example.com',
            'email_verified_at' => now(),
            'habilitado' => true,
            'area_trabajo' => 'Dirección',
            'password' => bcrypt('admin'),
            'rol_id' => 1
        ]);

        // 5 líderes
        $leaders = [
            ['Juan', 'Pérez'],
            ['Carlos', 'Gómez'],
            ['Mariana', 'López'],
            ['Andrés', 'Hernández'],
            ['Lucía', 'Ramírez']
        ];

        foreach ($leaders as $leader) {
            User::create([
                'foto' => '',
                'nombres' => $leader[0],
                'apellidos' => $leader[1],
                'nombre_completo' => $leader[0],
                'username' => strtolower($leader[0]) . rand(100, 999),
                'email' => strtolower($leader[0]) . rand(10, 99) . '@example.com',
                'habilitado' => true,
                'area_trabajo' => 'Gestión',
                'password' => bcrypt('password'),
                'rol_id' => 2 // Líder
            ]);
        }

        // 10 empleados
        $employees = [
            ['Daniel', 'Fernández'],
            ['Sofía', 'Castro'],
            ['Mateo', 'Rojas'],
            ['Valentina', 'Mendoza'],
            ['Diego', 'Silva'],
            ['Camila', 'Ortiz'],
            ['Fernando', 'Navarro'],
            ['Gabriela', 'Morales'],
            ['Ricardo', 'Vargas'],
            ['Alejandra', 'Torres']
        ];

        foreach ($employees as $employee) {
            User::create([
                'foto' => '',
                'nombres' => $employee[0],
                'apellidos' => $employee[1],
                'nombre_completo' => $employee[0],
                'username' => strtolower($employee[0]) . rand(100, 999),
                'email' => strtolower($employee[0]) . rand(10, 99) . '@example.com',
                'habilitado' => true,
                'area_trabajo' => 'Operaciones',
                'password' => bcrypt('password'),
                'rol_id' => 3 // Empleado
            ]);
        }
    }
}

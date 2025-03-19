<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Notificacion;
use App\Models\User;
use Faker\Factory as Faker;

class NotificacionSeeder extends Seeder {
    public function run(): void {
        $faker = Faker::create();
        $usuarios = User::all();

        foreach ($usuarios as $usuario) {
            Notificacion::create([
                'mensaje' => 'Nueva tarea asignada a ' . $usuario->nombres,
                'user_id' => $usuario->id,
                'read' => false
            ]);
        }
    }
}

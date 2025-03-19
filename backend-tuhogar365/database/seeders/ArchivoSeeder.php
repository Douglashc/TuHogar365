<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Archivo;
use App\Models\Tarea;
use Faker\Factory as Faker;

class ArchivoSeeder extends Seeder {
    public function run(): void {
        $faker = Faker::create();
        $tareas = Tarea::all();

        foreach ($tareas as $tarea) {
            Archivo::create([
                'nombre_archivo' => $faker->word . '.pdf',
                'ruta_archivo' => '/storage/uploads/' . $faker->word . '.pdf',
                'fecha_subida' => now(),
                'tarea_id' => $tarea->id
            ]);
        }
    }
}

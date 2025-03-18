<?php

namespace Database\Seeders;

use Faker\Factory as Faker;
use Illuminate\Support\Str;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PruebaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // \App\Models\Categoria::create([
        //     'nombre' => 'Cat nuevo',
        //     'rango_min' => 50,
        //     'rango_max' => 80,
        //     'habilitado' => true,
        // ]);
        
        $categorias = [
            'Feather',
            'Light',
        ];
        foreach ($categorias as $value) {
            // \App\Models\CategoriaPeso::create([
            //     'nombre' => $value,
            //     'genero' => 'M',
            //     'habilitado' => true,
            // ]);
        }
        
        // \App\Models\Estudiante::create([
        //     'nombres' => 'Juan',
        //     'apellidos' => 'Pérez',
        //     'fecha_nacimiento' => '1990-02-15',
        //     'genero' => 'M',
        //     'cinturon' => 'NEGRO',
        //     'peso' => 75,
        //     'habilitado' => true,
        //     'categoria_id' => 1,
        // ]);
        
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Proyecto;
use App\Models\Equipo;

class ProyectoSeeder extends Seeder {
    public function run(): void {
        // Obtener todos los equipos
        $equipos = Equipo::all();

        // Lista de proyectos con nombres y descripciones manuales
        $proyectos = [
            [
                'nombre' => 'Rediseño de Página Web',
                'descripcion' => 'Actualizar el diseño y mejorar la experiencia de usuario del sitio web corporativo.',
            ],
            [
                'nombre' => 'Campaña de Marketing Digital',
                'descripcion' => 'Estrategia de publicidad en redes sociales para aumentar el alcance de la empresa.',
            ],
            [
                'nombre' => 'Sistema de Gestión Interna',
                'descripcion' => 'Desarrollo de un sistema web para optimizar los procesos internos de la empresa.',
            ],
            [
                'nombre' => 'Aplicación Móvil de Clientes',
                'descripcion' => 'Creación de una app móvil para que los clientes gestionen sus pedidos y servicios.',
            ],
            [
                'nombre' => 'Estrategia de Redes Sociales',
                'descripcion' => 'Planificación y ejecución de contenido para mejorar la presencia en redes sociales.',
            ],
            [
                'nombre' => 'Desarrollo de E-commerce',
                'descripcion' => 'Implementación de una tienda en línea con opciones de pago y seguimiento de pedidos.',
            ],
            [
                'nombre' => 'Automatización de Procesos',
                'descripcion' => 'Integración de herramientas para automatizar tareas repetitivas en la empresa.',
            ],
            [
                'nombre' => 'Optimización de SEO',
                'descripcion' => 'Mejorar el posicionamiento en buscadores mediante estrategias SEO avanzadas.',
            ],
            [
                'nombre' => 'Plataforma de E-learning',
                'descripcion' => 'Desarrollo de una plataforma para cursos y capacitación en línea.',
            ],
            [
                'nombre' => 'Aplicación de Gestión de Inventarios',
                'descripcion' => 'Software para monitorear y controlar los niveles de inventario en tiempo real.',
            ]
        ];

        // Asignar cada proyecto a un equipo de forma aleatoria
        foreach ($proyectos as $proyecto) {
            $equipo = $equipos->random();

            Proyecto::create([
                'nombre_proyecto' => $proyecto['nombre'],
                'descripcion' => $proyecto['descripcion'],
                'equipo_id' => $equipo->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

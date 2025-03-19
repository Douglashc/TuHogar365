<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tarea;
use App\Models\Proyecto;
use App\Models\User;

class TareaSeeder extends Seeder {
    public function run(): void {
        // Obtener todos los proyectos
        $proyectos = Proyecto::all();

        foreach ($proyectos as $proyecto) {
            // Obtener los miembros del equipo asignado al proyecto
            $equipoId = $proyecto->equipo_id;
            $miembros = User::whereHas('equipos', function ($query) use ($equipoId) {
                $query->where('equipo_id', $equipoId);
            })->where('rol_id', 3) // Solo empleados (rol_id 3)
              ->get();

            // Obtener un líder del equipo para asignar tareas (rol_id 2)
            $lideres = User::whereHas('equipos', function ($query) use ($equipoId) {
                $query->where('equipo_id', $equipoId);
            })->where('rol_id', 2)->get();
            $lider = $lideres->isNotEmpty() ? $lideres->random() : null;

            $tareas = [];

            switch ($proyecto->nombre_proyecto) {
                case 'Sitio Web Corporativo':
                    $tareas = [
                        ['titulo' => 'Diseñar la página de inicio', 'descripcion' => 'Crear un diseño atractivo y responsivo para la página de inicio.'],
                        ['titulo' => 'Implementar formulario de contacto', 'descripcion' => 'Desarrollar un formulario funcional con validaciones y envío de correos.'],
                        ['titulo' => 'Optimizar el rendimiento del sitio', 'descripcion' => 'Mejorar tiempos de carga y optimizar imágenes y scripts.'],
                        ['titulo' => 'Configurar SEO básico', 'descripcion' => 'Agregar etiquetas meta, sitemap y configurar Google Analytics.'],
                        ['titulo' => 'Realizar pruebas de compatibilidad', 'descripcion' => 'Verificar que el sitio se vea correctamente en distintos navegadores y dispositivos.'],
                    ];
                    break;

                case 'Campaña Publicitaria en Redes Sociales':
                    $tareas = [
                        ['titulo' => 'Crear contenido visual', 'descripcion' => 'Diseñar imágenes y videos promocionales para la campaña.'],
                        ['titulo' => 'Redactar copys para publicaciones', 'descripcion' => 'Escribir textos atractivos y persuasivos para redes sociales.'],
                        ['titulo' => 'Configurar anuncios en Facebook e Instagram', 'descripcion' => 'Definir segmentación, presupuesto y programación de los anuncios.'],
                        ['titulo' => 'Analizar métricas de la campaña', 'descripcion' => 'Revisar estadísticas y ajustar estrategias según el desempeño.'],
                        ['titulo' => 'Interactuar con la audiencia', 'descripcion' => 'Responder comentarios y mensajes para mejorar el engagement.'],
                    ];
                    break;

                case 'Aplicación Móvil de Gestión de Tareas':
                    $tareas = [
                        ['titulo' => 'Diseñar wireframes de la app', 'descripcion' => 'Crear los bocetos de las pantallas principales de la aplicación.'],
                        ['titulo' => 'Desarrollar la autenticación de usuarios', 'descripcion' => 'Implementar login con correo y redes sociales.'],
                        ['titulo' => 'Crear sistema de notificaciones', 'descripcion' => 'Configurar alertas push para recordatorios de tareas.'],
                        ['titulo' => 'Implementar sincronización con la nube', 'descripcion' => 'Asegurar que los datos se almacenen correctamente en el servidor.'],
                        ['titulo' => 'Realizar pruebas de usabilidad', 'descripcion' => 'Evaluar la experiencia del usuario y realizar mejoras necesarias.'],
                    ];
                    break;

                default:
                    $tareas = [
                        ['titulo' => 'Definir objetivos del proyecto', 'descripcion' => 'Establecer los principales hitos y entregables del proyecto.'],
                        ['titulo' => 'Asignar roles y responsabilidades', 'descripcion' => 'Determinar quién será responsable de cada tarea.'],
                        ['titulo' => 'Elaborar cronograma de actividades', 'descripcion' => 'Organizar las fechas clave y plazos de cada tarea.'],
                        ['titulo' => 'Desarrollar documentación técnica', 'descripcion' => 'Redactar especificaciones y guías para el equipo.'],
                        ['titulo' => 'Preparar presentación final', 'descripcion' => 'Crear un informe o presentación con los resultados obtenidos.'],
                    ];
                    break;
            }

            // Asignar las tareas a los empleados del equipo
            foreach ($tareas as $tareaData) {
                $empleado = $miembros->random(); // Seleccionar un empleado aleatorio

                Tarea::create([
                    'proyecto_id' => $proyecto->id,
                    'user_id_asigna' => $lider ? $lider->id : null, // El líder asigna la tarea
                    'user_id_realiza' => $empleado->id, // El empleado realiza la tarea
                    'titulo' => $tareaData['titulo'],
                    'descripcion' => $tareaData['descripcion'],
                    'fecha_inicio' => now(),
                    'fecha_final' => now()->addDays(rand(3, 10)),
                    'estado' => 'pendiente',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}

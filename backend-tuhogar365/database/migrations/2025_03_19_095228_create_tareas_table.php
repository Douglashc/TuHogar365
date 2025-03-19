<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tareas', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('proyecto_id')->unsigned();
            $table->bigInteger('user_id_asigna')->unsigned()->nullable();
            $table->bigInteger('user_id_realiza')->unsigned()->nullable();
            $table->string('titulo');
            $table->text('descripcion');
            $table->date('fecha_inicio')->nullable();
            $table->date('fecha_final')->nullable();
            $table->enum('estado', ['pendiente', 'en proceso', 'en revision', 'completado'])->default('pendiente');

            $table->foreign('proyecto_id')->references('id')->on('proyectos')->onDelete('cascade');
            $table->foreign('user_id_asigna')->references('id')->on('users')->onDelete('set null');
            $table->foreign('user_id_realiza')->references('id')->on('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tareas');
    }
};

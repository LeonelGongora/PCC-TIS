<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {

            $table->id();
            $table->string('nombre_evento', 120);
            $table->date('fecha_inicio');
            $table->integer('numero_contacto');
            $table->text('descripcion');
            $table->date('fecha_limite');
            $table->date('fecha_fin');
            $table->integer('participantes_equipo')->nullable();
            $table->string('name')->nullable();

            $table->unsignedBigInteger('event_type_id');

            $table->foreign('event_type_id')
                ->references('id')
                ->on('event_types')
                ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('events');
    }
}

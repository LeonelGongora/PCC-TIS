<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('apellido');
            $table->integer('dni')->nullable();
            $table->string('telefono')->nullable();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('password_confirmed');
            $table->integer('tipo_usuario')->default(0); //0 admi, 1 participante, 2 encargado, 3 secretario, 4 instructor
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
        Schema::dropIfExists('users');
    }
}

<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('pictures', function (Blueprint $table) {
            $table->id();
            $table->foreignId('person_id')->constrained('people')->onDelete('cascade');
            $table->string('url');
            $table->unsignedSmallInteger('order')->default(0);
            $table->timestamps();
        });
    }
    public function down()
    {
        Schema::dropIfExists('pictures');
    }
};

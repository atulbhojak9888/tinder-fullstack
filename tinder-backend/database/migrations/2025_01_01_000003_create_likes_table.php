<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('likes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('person_id')->constrained('people')->onDelete('cascade');
            $table->unsignedBigInteger('liker_id')->nullable();
            $table->enum('type', ['like','dislike']);
            $table->timestamps();
            $table->unique(['person_id','liker_id','type'],'uniq_person_liker_type');
        });
    }
    public function down()
    {
        Schema::dropIfExists('likes');
    }
};

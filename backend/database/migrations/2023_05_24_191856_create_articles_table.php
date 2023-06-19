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
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable(true);
            $table->text('body')->nullable(true);
            $table->string('author')->nullable(true);
            $table->text('images')->nullable(true);
            $table->text('published_at')->nullable(true);
            $table->text('source_name')->nullable(true);
            $table->string('category_name')->nullable(true);
            $table->text('url')->nullable(true);
            $table->integer('api_type')->nullable(true)->comment('1=NewsAPI,2=GuardianAPI,3=NyTimesAPI');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
{
    $categories = [
        'World',
        'Politics',
        'Business',
        'Technology',
        'Science',
        'Health',
        'Sports',
        'Entertainment',
        'Lifestyle',
        'Travel',
    ];

    foreach ($categories as $category) {
        DB::table('categories')->updateOrInsert(
            ['name' => $category],
            ['created_at' => Carbon::now(), 'updated_at' => Carbon::now()]
        );
    }
}

}

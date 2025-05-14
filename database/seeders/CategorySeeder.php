<?php

namespace Database\Seeders;

use App\Models\Categories;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            'Self Improvement',
            'Formula 1',
            'Teknologi',
            'Soft News',
            'Koleksi Penggemar',
            'Sosial Kemasyarakatan',
            'Pendidikan dan Teknologi',
            'Pop Culture, Hiburan dan Budaya',
            'Ekonomi',
            'Budaya',
            'Bioteknologi',
            'Tokoh Dunia',
            'Politik',
            'Hiburan',
            'Cuaca',
            'Tahukah Kamu',
            'Transportasi dan Teknologi',
            'Kesehatan',
            'Selebriti',
            'Trend',
            'Pariwisata',
        ];

        foreach ($categories as $category) {
            Categories::create([
                'name' => $category,
                'slug' => Str::slug($category),
            ]);
        }
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categories;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CategoriesController extends Controller
{
    // GET /api/categories
    public function index()
    {
        return response()->json(Categories::all());
    }

    // POST /api/categories
    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048',  // Gambar menjadi optional
        ]);

        // Generate slug dari name
        $slug = Str::slug($request->name);

        // Cek apakah slug sudah ada, jika ada tambahkan suffix
        if (Categories::where('slug', $slug)->exists()) {
            $slug = $slug . '-' . Str::random(5);  // Menambahkan suffix untuk menghindari duplikasi
        }

        // Menyimpan gambar kategori jika ada gambar
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('categories', 'public');
        }

        // Membuat kategori baru
        Categories::create([
            'name' => $request->name,
            'slug' => $slug, // Menyimpan slug
            'image' => $imagePath,  // Gambar akan diset null jika tidak ada
        ]);

        return response()->json(['message' => 'Category created'], 201);
    }

    // POST /api/categories/{id}
    public function update(Request $request, $id)
    {
        $category = Categories::findOrFail($id);

        // Validasi input
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048',  // Gambar tetap optional
        ]);

        // Jika ada gambar yang diunggah, hapus gambar lama
        if ($request->hasFile('image')) {
            if ($category->image) {
                Storage::disk('public')->delete($category->image);
            }
            $imagePath = $request->file('image')->store('categories', 'public');
            $category->image = $imagePath;
        }

        // Update nama dan slug (slug dihasilkan kembali)
        $category->name = $request->name;
        $category->slug = Str::slug($request->name);  // Generate slug baru berdasarkan nama
        $category->save();

        return response()->json(['message' => 'Category updated']);
    }

    // OPTIONAL: DELETE /api/categories/{id}
    public function destroy($id)
    {
        $category = Categories::findOrFail($id);

        // Hapus gambar jika ada
        if ($category->image) {
            Storage::disk('public')->delete($category->image);
        }

        // Hapus kategori
        $category->delete();

        return response()->json(['message' => 'Category deleted']);
    }
}


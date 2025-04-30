<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categories;
use Illuminate\Support\Facades\Storage;

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
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'required|image|max:2048',
        ]);

        $imagePath = $request->file('image')->store('categories', 'public');

        Categories::create([
            'name' => $request->name,
            'image' => $imagePath,
        ]);

        return response()->json(['message' => 'Category created'], 201);
    }

    // POST /api/categories/{id}
    public function update(Request $request, $id)
    {
        $category = Categories::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            if ($category->image) {
                Storage::disk('public')->delete($category->image);
            }
            $imagePath = $request->file('image')->store('categories', 'public');
            $category->image = $imagePath;
        }

        $category->name = $request->name;
        $category->save();

        return response()->json(['message' => 'Category updated']);
    }

    // OPTIONAL: DELETE /api/categories/{id}
    public function destroy($id)
    {
        $category = Categories::findOrFail($id);
        if ($category->image) {
            Storage::disk('public')->delete($category->image);
        }
        $category->delete();

        return response()->json(['message' => 'Category deleted']);
    }
}
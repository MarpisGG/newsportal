<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Messages;

class MessagesController extends Controller
{
    // Menampilkan semua pesan
    public function index()
    {
        // Mengambil semua pesan dan mengembalikannya dalam format JSON
        $messages = Messages::all();
        return response()->json($messages);
    }

    // Menyimpan pesan
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
            'file' => 'nullable|file|max:2048', // Maksimal 2MB
        ]);

        $filePath = null;

        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('contact_files', 'public');
        }

        Messages::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'message' => $request->message,
            'file' => $filePath,
        ]);

        return response()->json(['message' => 'Pesan berhasil dikirim!']);
    }

    // Menampilkan pesan berdasarkan ID
    public function show($id)
    {
        $contact = Messages::findOrFail($id);
        return response()->json($contact);
    }

    // Menghapus pesan berdasarkan ID
    public function destroy($id)
    {
        $contact = Messages::findOrFail($id);
        $contact->delete();
        return response()->json(['message' => 'Pesan berhasil dihapus!']);
    }
}

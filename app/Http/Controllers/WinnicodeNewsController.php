<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WinnicodeNewsController extends Controller
{
    public function index()
    {
        $apiKey = config('services.winnicode.key');

        $response = Http::withHeaders([
            'Authorization' => "Bearer {$apiKey}",
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
        ])->get('https://winnicode.com/api/publikasi-berita');

        return response()->json($response->json(), $response->status());
    }

    public function getDetail($slug)
    {
        $apiKey = env('EXTERNAL_API_KEY');
        $response = Http::withHeaders([
            'Authorization' => "Bearer {$apiKey}",
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
        ])->get("https://winnicode.com/api/publikasi-berita/{$slug}");

        if ($response->successful()) {
            return response()->json($response->json());
        } else {
            return response()->json(['message' => 'Failed to fetch article'], $response->status());
        }
    }
}
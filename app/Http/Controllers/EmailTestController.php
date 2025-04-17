<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Mail;

class EmailTestController extends Controller
{
    public function sendTestEmail()
    {
        Mail::raw('Halo ini adalah tes email dari Laravel pakai SendGrid 🎉', function ($message) {
            $message->to('emailtujuan@example.com') // ganti dengan email tujuan
                    ->subject('Tes Email SendGrid');
        });

        return response()->json(['message' => 'Email berhasil dikirim!']);
    }
}
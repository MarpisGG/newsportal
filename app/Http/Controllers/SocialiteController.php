<?php

namespace App\Http\Controllers;

use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class SocialiteController extends Controller
{
    public function redirectToGoogle()
{
    return Socialite::driver('google')->redirect();
}

public function handleGoogleCallback()
{
    try {
        $googleUser = Socialite::driver('google')->user(); // tambahkan stateless jika perlu
        $user = User::firstOrCreate([
            'email' => $googleUser->getEmail(),
        ], [
            'name' => $googleUser->getName(),
            'password' => bcrypt('google-oauth'), // password dummy
        ]);

        // Optional: generate Sanctum token untuk frontend React
        $token = $user->createToken('auth_token')->plainTextToken;

        return redirect("http://localhost:3000/oauth-success?token={$token}&name={$user->name}");
    } catch (\Exception $e) {
        return redirect('http://localhost:3000/login?error=Google+login+failed');
    }
}
}

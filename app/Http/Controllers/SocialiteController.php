<?php

namespace App\Http\Controllers;

use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SocialiteController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect()->getTargetUrl();
    }

    public function handleGoogleCallback()
{
    try {
        $googleUser = Socialite::driver('google')->user();

        // Example token and role logic
        $user = User::firstOrCreate([
            'email' => $googleUser->getEmail()
        ], [
            'name' => $googleUser->getName(),
            'google_id' => $googleUser->getId(),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        // Redirect to frontend with token and name
        return redirect("http://localhost:8000/google/callback?token=$token&name={$user->name}");
    } catch (\Exception $e) {
        return redirect("http://localhost:8000/login");
    }
}

        public function getGoogleRedirectUrl()
        {
            $url = Socialite::driver('google')->redirect()->getTargetUrl();
            return response()->json(['url' => $url]);
        }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    public function register(Request $request)
    {   
        // Validasi request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'phone' => 'required|string',
            'gender' => 'required|string',
            'date_of_birth' => 'required|date',
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Handle profile image upload if provided
        $profileImagePath = null;
        if ($request->hasFile('profile_image')) {
            $image = $request->file('profile_image');
            $profileImagePath = $image->store('profile-images', 'public');
        }

        // Simpan user baru
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'gender' => $request->gender,
            'date_of_birth' => $request->date_of_birth,
            'bio' => $request->bio ?? null,
            'profile_image' => $profileImagePath,
        ]);

        return response()->json([
            'message' => 'User registered successfully!', 
            'user' => $user,
            'profile_image_url' => $profileImagePath ? url('storage/' . $profileImagePath) : null
        ], 201);
    }

    public function login(Request $request)
    {
        // Validate request
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Find user by email
        $user = User::where('email', $request->email)->first();

        // Check if user exists and password matches
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        // Add profile image URL to response
        $profileImageUrl = $user->profile_image 
            ? url('storage/' . $user->profile_image) 
            : null;

        
        // Generate token for the user
        Auth::login($user);
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user,
            'profile_image_url' => $profileImageUrl
        ], 200);
    }

    public function updateUser(Request $request, $id)
    {

        $user = Auth::user(); // Get logged-in user
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }
        
        // Validate request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$id,
            'phone' => 'nullable|string',
            'gender' => 'nullable|string',
            'date_of_birth' => 'nullable|date',
            'bio' => 'nullable|string',
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Find user
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Handle profile image upload if provided
        if ($request->hasFile('profile_image')) {
            // Delete old image if exists
            if ($user->profile_image) {
                Storage::disk('public')->delete($user->profile_image);
            }
            
            // Store new image
            $image = $request->file('profile_image');
            $profileImagePath = $image->store('profile-images', 'public');
            $user->profile_image = $profileImagePath;
        }

        // Update user data
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->gender = $request->gender;
        $user->date_of_birth = $request->date_of_birth;
        $user->bio = $request->bio;
        
        // Save changes
        $user->save();

        // Add profile image URL to response
        $profileImageUrl = $user->profile_image 
            ? url('storage/' . $user->profile_image) 
            : null;

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user,
            'profile_image_url' => $profileImageUrl
        ], 200);
    }

    public function uploadProfileImage(Request $request, $id)
    {
        // Validate request
        $validator = Validator::make($request->all(), [
            'profile_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Find user
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Delete old image if exists
        if ($user->profile_image) {
            Storage::disk('public')->delete($user->profile_image);
        }
        
        // Store new image
        $image = $request->file('profile_image');
        $profileImagePath = $image->store('profile-images', 'public');
        $user->profile_image = $profileImagePath;
        
        // Save changes
        $user->save();

        return response()->json([
            'message' => 'Profile image uploaded successfully',
            'user' => $user,
            'profile_image_url' => url('storage/' . $profileImagePath)
        ], 200);
    }

    public function getUser(Request $request)
    {
        $user = Auth::user();
        
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }
        
        // Add profile image URL to response
        $profileImageUrl = $user->profile_image 
            ? url('storage/' . $user->profile_image) 
            : null;
            
        return response()->json([
            'user' => $user,
            'profile_image_url' => $profileImageUrl
        ]);
    }
    

    
}
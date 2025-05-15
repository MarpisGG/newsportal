<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\User;

class CommentController extends Controller
{
    public function index()
    {
        return response()->json(Comment::with('user')->get());
    }
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'slug' => 'required|string|max:255',
            'content' => 'required|string|max:1000',
        ]);

        Comment::create([
            'user_id' => $request->user_id,
            'slug' => $request->slug,
            'content' => $request->content,
        ]);

        return response()->json(['message' => 'Comment created'], 201);
    }

    public function getComments($slug)
    {
        $comments = Comment::with('user')->where('slug', $slug)->latest()->get();
        return response()->json($comments);
    }
}

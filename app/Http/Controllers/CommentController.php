<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    // Get all comments (for debugging/admin)
    public function index()
    {
        return response()->json(
            Comment::with('user')->latest()->get()
        );
    }

    // Store comment
    public function store(Request $request)
    {
        // Validate only slug and content; user_id from auth
        $request->validate([
            'slug'    => 'required|string|max:255',
            'content' => 'required|string|max:1000',
        ]);

        $user = Auth::user();

        dd($user);

        $comment = Comment::create([
            'user_id' => $user->id,
            'slug'    => $request->slug,
            'content' => $request->content,
        ]);

        return response()->json($comment, 201);
    }

    // Get comments by article slug
    public function getComments($slug)
    {
        $comments = Comment::with('user')
            ->where('slug', $slug)
            ->latest()
            ->get();

        return response()->json($comments);
    }

    // Optional: delete comment by id
    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);

        // Only the owner can delete
        if ($comment->user_id !== Auth::id()) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $comment->delete();
        return response()->json(null, 204);
    }
}
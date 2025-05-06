<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Messages extends Model
{
    use \Illuminate\Database\Eloquent\Factories\HasFactory;

    protected $table = 'messages';

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'message',
        'file',
    ];

    public function getFileUrlAttribute()
    {
        return $this->file ? asset('storage/' . $this->file) : null;
    }
}

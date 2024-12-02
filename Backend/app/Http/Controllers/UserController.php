<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function createUser(Request $request)
    {
        $user = User::create([
            "name" => "imad3",
            "email" => "imad3@imad.com",
            "password" => "1234"
        ]);
        return $user;
    }
    public function login(Request $request)
    {
     
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

 
        $user = User::where('email', $request->input('email'))->first();

 
        if (!$user) {
            return response()->json(['message' => 'User Not Found'], 401);
        }

  
        if (Hash::check($request->input('password'), $user->password)) {
            return response()->json(['message' => 'Wrong password'], 401);
        }

      
        $token = $user->createToken('auth_token');

      
        return response()->json([
            'token' => $token->plainTextToken,
            'role' => $user->role
        ]);
    }

}

<?php

namespace App\Http\Controllers;

use App\Models\Professor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfessorsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Professor $professor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Professor $professor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Professor $professor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Professor $professor)
    {
        //
    }
    // public function login(Request $request)
    // {

    //     $request->validate([
    //         'email' => 'required|email',
    //         'password' => 'required'
    //     ]);


    //     $user = Professor::where('gmail', $request->input('email'))->first();


    //     if (!$user) {
    //         return response()->json(['message' => 'User Not Found'], 401);
    //     }


    //     if (Hash::check($request->input('password'), $user->password)) {
    //         return response()->json(['message' => 'Wrong password'], 401);
    //     }


    //     $token = $user->createToken('auth_token');


    //     return response()->json([
    //         'token' => $token->plainTextToken,
    //         'role' => "admin"
    //     ]);
    // }
}

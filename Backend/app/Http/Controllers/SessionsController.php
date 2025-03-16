<?php

namespace App\Http\Controllers;

use App\Models\Professor;
use App\Models\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class SessionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

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
    public function show(Session $session)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Session $session)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Session $session)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Session $session)
    {
        //
    }
    public function getSessionInfo($sessionId)
    {
        // Retrieve the session with its relationships
        $session = Session::with(['subject', 'group', 'professor', 'attendance', 'justifications'])
            ->find($sessionId);

        // Check if the session exists
        if (!$session) {
            return response()->json(['error' => 'Session not found'], 404);
        }

        // Return session data
        return response()->json([
            'session_id' => $session->session_id,
            'subject' => $session->subject,
            'group' => $session->group,
            'professor' => $session->professor,
            'date' => $session->session_date->toDateString(),
            'hours' => $session->session_hours,
            'time' => $session->time,
        ]);
    }


}

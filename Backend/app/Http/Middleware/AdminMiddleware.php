<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $user = auth()->user();

        if (!$user || $user->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized access, admin rights required.'
            ], 403);
        }

        return $next($request); // Allow access if user is an admin
    }
}

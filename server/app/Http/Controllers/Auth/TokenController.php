<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
class TokenController extends Controller
{
    /**
     * Handle a login request to the application.
     *
     * Sample Request Payload:
     * {
     *     'email': 'test@example.com',
     *     'password': 'password'
     * }
     * Sample Success Response (200):
     * {
     *     'access_token': 'TOKEN',
     *     'token_type': 'Bearer'
     * }
     * Sample Failed Response (401):
     * {
     *     'message': 'Invalid login details'
     * }
     *
     * @param \App\Http\Requests\LoginRequest $request
     * @return \Illuminate\Http\JsonResponse
     */

     public function __construct()
     {
         // Prevent this route from being protected
         $this->middleware('auth:sanctum')->except(['login']);
     }

    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');
        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid login details'], 401);
        }

        $user = Auth::user();

        if (is_null($user->email_verified_at)) {
            Auth::logout();
    
            return response()->json([
                'message' => 'Please verify your email before logging in.'
            ], 403);
        }
        
        $tokenResult = $user->createToken('auth_token');

        $tokenResult->accessToken->expires_at = now()->addDays(1); //Expires in a day
        $tokenResult->accessToken->save();

        return response()->json(['access_token' => $tokenResult->accessToken->token, 'token_type' => 'Bearer']);
    }}

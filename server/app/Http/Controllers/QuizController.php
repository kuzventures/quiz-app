<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    public function index()
    {
        // Fetch the first available quiz with questions
        $quiz = Quiz::with('questions')->first();

        if (!$quiz) {
            return response()->json(['message' => 'No quiz found'], 404);
        }

        // Optionally remove correct answers from the response
        $quiz->questions->transform(function ($q) {
            return [
                'id' => $q->id,
                'text' => $q->text,
                'options' => $q->options,
            ];
        });

        return response()->json($quiz);
    }
}

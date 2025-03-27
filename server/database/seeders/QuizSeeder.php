<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Quiz;
use App\Models\Question;

class QuizSeeder extends Seeder
{
    public function run(): void
    {
        // Create one quiz
        $quiz = Quiz::create([
            'name' => 'BrainPOP Essentials',
            'description' => 'Test your knowledge about BrainPOP'
        ]);

        // Add questions to this quiz
        $questions = [
            [
                'text' => 'What is the mission of BrainPOP?',
                'options' => [
                    'To provide textbooks for all subjects',
                    'To create joyful and impactful learning experiences',
                    'To train teachers in advanced technology',
                    'To offer standardized testing support'
                ],
                'correct_answer_index' => 1
            ],
            [
                'text' => 'Who is BrainPOP designed for?',
                'options' => [
                    'Only high school students',
                    'College professors',
                    'Learners of all ages and their educators',
                    'IT departments'
                ],
                'correct_answer_index' => 2
            ],
            [
                'text' => 'What makes BrainPOP’s learning style unique?',
                'options' => [
                    'It relies only on printed materials',
                    'It provides strict testing environments',
                    'It uses joyful, engaging learning experiences',
                    'It teaches only math and science'
                ],
                'correct_answer_index' => 2
            ],
            [
                'text' => 'Which of the following is NOT a target audience of BrainPOP?',
                'options' => [
                    'Administrators',
                    'Parents and caregivers',
                    'Athletes',
                    'Teachers'
                ],
                'correct_answer_index' => 2
            ],
            [
                'text' => 'What is BrainPOP’s promise to learners?',
                'options' => [
                    'Fast internet browsing',
                    'A promise of lifelong impact through learning',
                    'Discounts on college tuition',
                    'Easy homework answers'
                ],
                'correct_answer_index' => 1
            ]
        ];

        foreach ($questions as $q) {
            Question::create([
                'quiz_id' => $quiz->id,
                'text' => $q['text'],
                'options' => $q['options'],
                'correct_answer_index' => $q['correct_answer_index']
            ]);
        }
    }
}

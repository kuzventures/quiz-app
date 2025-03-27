<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Emma Johnson',
            'email' => 'emma.johnson@example.com',
            'password' => Hash::make('EmmaSecure123!'),
            'email_verified_at' => now(),
        ]);
        
        User::create([
            'name' => 'Liam Carter',
            'email' => 'liam.carter@example.com',
            'password' => Hash::make('LiamStrong456!'),
            'email_verified_at' => null,
        ]);
    }
}

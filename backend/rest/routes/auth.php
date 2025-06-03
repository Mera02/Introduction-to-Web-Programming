<?php

require_once __DIR__ . '/../../services/UserService.php';
require_once __DIR__ . '/../../utils/JwtHelper.php';

$userService = new UserService();


Flight::route('GET /auth/ping', function () {
    Flight::json(["message" => "Auth route OK"]);
});


Flight::route('POST /auth/register', function() use ($userService) {
    $data = Flight::request()->data->getData();

    
    $user = $userService->register($data);

    unset($user['password']);

    Flight::json([
        'message' => 'Registracija uspješna',
        'user' => $user
    ]);
});


Flight::route('POST /auth/login', function() use ($userService) {
    $data = Flight::request()->data->getData();

    $user = $userService->getByEmail($data['email']);

    if (!$user || !password_verify($data['password'], $user['password'])) {
        Flight::halt(401, 'Invalid email or password');
    }

    
    $token = JwtHelper::createToken([
        'id' => $user['id'],
        'email' => $user['email'],
        'role' => $user['role']
    ]);

    unset($user['password']);

    Flight::json([
        'message' => 'Login successful',
        'token' => $token,
        'user' => $user
    ]);
});

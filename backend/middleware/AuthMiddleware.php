<?php

require_once __DIR__ . '/../utils/JwtHelper.php';

class AuthMiddleware
{
    public static function check()
    {
        $headers = getallheaders();

        if (!isset($headers['Authorization'])) {
            Flight::halt(401, 'Missing Authorization header');
        }

        $authHeader = $headers['Authorization'];
        if (!str_starts_with($authHeader, 'Bearer ')) {
            Flight::halt(401, 'Invalid Authorization format');
        }

        $token = str_replace('Bearer ', '', $authHeader);

        try {
            $decoded = JwtHelper::decodeToken($token);
            Flight::set('user', (array)$decoded);
        } catch (Exception $e) {
            Flight::halt(401, 'Invalid or expired token');
        }
    }

    public static function requireRole($role)
    {
        $user = Flight::get('user');
        if (!isset($user['role']) || $user['role'] !== $role) {
            Flight::halt(403, "Access denied. Must be $role");
        }
    }
}

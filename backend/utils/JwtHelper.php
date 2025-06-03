<?php

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

class JwtHelper {
    private static $secret = 'faris123'; // promijeni ovo u nešto jače za pravi projekat
    private static $algorithm = 'HS256';

    public static function createToken($payload) {
        $payload['iat'] = time();                 // issued at
        $payload['exp'] = time() + (60 * 60);     // expires in 1 hour
        return JWT::encode($payload, self::$secret, self::$algorithm);
    }

    public static function decodeToken($token) {
        return (array) JWT::decode($token, new Key(self::$secret, self::$algorithm));
    }
}

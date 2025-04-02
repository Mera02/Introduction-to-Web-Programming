<?php
if (!class_exists('Database')) {
    class Database {
        private static $instance = null;

        public static function connect() {
            if (self::$instance === null) {
                $host = 'localhost';
                $dbname = 'cevabdzinica_zmaj';
                $username = 'root';
                $password = '';

                try {
                    self::$instance = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
                    self::$instance->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                } catch (PDOException $e) {
                    die("Database connection failed: " . $e->getMessage());
                }
            }
            return self::$instance;
        }
    }
}

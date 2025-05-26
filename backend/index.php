<?php

header("Access-Control-Allow-Origin: http://127.0.0.1:5500"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/dao/BaseDao.php';
require __DIR__ . '/config.php';

Flight::set('flight.log_errors', true);


require __DIR__ . '/rest/routes/users.php';
require __DIR__ . '/rest/routes/products.php';
require __DIR__ . '/rest/routes/categories.php';
require __DIR__ . '/rest/routes/orders.php';
require __DIR__ . '/rest/routes/order_items.php';
require __DIR__ . '/rest/routes/auth.php';

Flight::start();

<?php
require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/dao/BaseDao.php';
require __DIR__ . '/config.php';

Flight::set('flight.log_errors', true);

// Rute
require __DIR__ . '/rest/routes/users.php';
require __DIR__ . '/rest/routes/products.php';
require __DIR__ . '/rest/routes/categories.php';
require __DIR__ . '/rest/routes/orders.php';
require __DIR__ . '/rest/routes/order_items.php';

Flight::start();

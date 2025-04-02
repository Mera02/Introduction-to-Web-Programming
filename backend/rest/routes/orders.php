<?php
require_once __DIR__ . '/../../dao/OrderDao.php';

$dao = new OrderDao();

Flight::route('GET /orders', function() use ($dao) {
    Flight::json($dao->getAll());
});

Flight::route('GET /orders/@id', function($id) use ($dao) {
    $order = $dao->getById($id);
    if ($order) {
        Flight::json($order);
    } else {
        Flight::halt(404, 'Order not found');
    }
});

Flight::route('POST /orders', function() use ($dao) {
    $data = Flight::request()->data->getData();
    Flight::json($dao->insert($data));
});

Flight::route('PUT /orders/@id', function($id) use ($dao) {
    $data = Flight::request()->data->getData();
    Flight::json($dao->update($id, $data));
});

Flight::route('DELETE /orders/@id', function($id) use ($dao) {
    Flight::json($dao->delete($id));
});

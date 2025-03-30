<?php
require_once __DIR__ . '/../../dao/OrderItemDao.php';

$dao = new OrderItemDao();

Flight::route('GET /order_items', function() use ($dao) {
    Flight::json($dao->getAll());
});

Flight::route('GET /order_items/@id', function($id) use ($dao) {
    $item = $dao->getById($id);
    if ($item) {
        Flight::json($item);
    } else {
        Flight::halt(404, 'Order item not found');
    }
});

Flight::route('POST /order_items', function() use ($dao) {
    $data = Flight::request()->data->getData();
    Flight::json($dao->insert($data));
});

Flight::route('PUT /order_items/@id', function($id) use ($dao) {
    $data = Flight::request()->data->getData();
    Flight::json($dao->update($id, $data));
});

Flight::route('DELETE /order_items/@id', function($id) use ($dao) {
    Flight::json($dao->delete($id));
});

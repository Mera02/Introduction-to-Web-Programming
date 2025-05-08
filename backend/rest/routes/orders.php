<?php
require_once __DIR__ . '/../../services/OrderService.php';

$service = new OrderService();

Flight::route('GET /orders', function() use ($service) {
    Flight::json(['All orders' => $service->getAll()]);
});

Flight::route('GET /orders/@id', function($id) use ($service) {
    $order = $service->getById($id);
    if ($order) {
        Flight::json($order);
    } else {
        Flight::halt(404, 'Order not found');
    }
});

Flight::route('POST /orders', function() use ($service) {
    $data = Flight::request()->data->getData();
    Flight::json($service->create($data));
});

Flight::route('PUT /orders/@id', function($id) use ($service) {
    $data = Flight::request()->data->getData();
    Flight::json($service->update($id, $data));
});

Flight::route('DELETE /orders/@id', function($id) use ($service) {
    Flight::json($service->delete($id));
});

<?php
require_once __DIR__ . '/../../services/OrderItemService.php';

$service = new OrderItemService();

Flight::route('GET /order_items', function() use ($service) {
    Flight::json(['All order items' => $service->getAll()]);
});

Flight::route('GET /order_items/@id', function($id) use ($service) {
    $item = $service->getById($id);
    if ($item) {
        Flight::json($item);
    } else {
        Flight::halt(404, 'Order item not found');
    }
});

Flight::route('POST /order_items', function() use ($service) {
    $data = Flight::request()->data->getData();
    Flight::json($service->create($data));
});

Flight::route('PUT /order_items/@id', function($id) use ($service) {
    $data = Flight::request()->data->getData();
    Flight::json($service->update($id, $data));
});

Flight::route('DELETE /order_items/@id', function($id) use ($service) {
    Flight::json($service->delete($id));
});

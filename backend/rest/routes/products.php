<?php
require_once __DIR__ . '/../../services/ProductService.php';

$service = new ProductService();

Flight::route('GET /products', function() use ($service) {
    Flight::json(['All products' => $service->getAll()]);
});

Flight::route('GET /products/@id', function($id) use ($service) {
    $product = $service->getById($id);
    if ($product) {
        Flight::json($product);
    } else {
        Flight::halt(404, 'Product not found');
    }
});

Flight::route('POST /products', function() use ($service) {
    $data = Flight::request()->data->getData();
    Flight::json($service->create($data));
});

Flight::route('PUT /products/@id', function($id) use ($service) {
    $data = Flight::request()->data->getData();
    Flight::json($service->update($id, $data));
});

Flight::route('DELETE /products/@id', function($id) use ($service) {
    Flight::json($service->delete($id));
});

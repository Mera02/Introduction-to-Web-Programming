<?php
require_once __DIR__ . '/../../services/CategoryService.php';

$service = new CategoryService();

Flight::route('GET /categories', function() use ($service) {
    Flight::json(['All categories' => $service->getAll()]);
});

Flight::route('GET /categories/@id', function($id) use ($service) {
    $category = $service->getById($id);
    if ($category) {
        Flight::json($category);
    } else {
        Flight::halt(404, 'Category not found');
    }
});

Flight::route('POST /categories', function() use ($service) {
    $data = Flight::request()->data->getData();
    Flight::json($service->create($data));
});

Flight::route('PUT /categories/@id', function($id) use ($service) {
    $data = Flight::request()->data->getData();
    Flight::json($service->update($id, $data));
});

Flight::route('DELETE /categories/@id', function($id) use ($service) {
    Flight::json($service->delete($id));
});

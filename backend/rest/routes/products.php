<?php
require_once __DIR__ . '/../../dao/ProductDao.php';

$dao = new ProductDao();

Flight::route('GET /products', function() use ($dao) {
    Flight::json($dao->getAll());
});

Flight::route('GET /products/@id', function($id) use ($dao) {
    $product = $dao->getById($id);
    if ($product) {
        Flight::json($product);
    } else {
        Flight::halt(404, 'Product not found');
    }
});

Flight::route('POST /products', function() use ($dao) {
    $data = Flight::request()->data->getData();
    Flight::json($dao->insert($data));
});

Flight::route('PUT /products/@id', function($id) use ($dao) {
    $data = Flight::request()->data->getData();
    Flight::json($dao->update($id, $data));
});

Flight::route('DELETE /products/@id', function($id) use ($dao) {
    Flight::json($dao->delete($id));
});

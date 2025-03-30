<?php
require_once __DIR__ . '/../../dao/CategoryDao.php';

$dao = new CategoryDao();

Flight::route('GET /categories', function() use ($dao) {
    Flight::json($dao->getAll());
});

Flight::route('GET /categories/@id', function($id) use ($dao) {
    $category = $dao->getById($id);
    if ($category) {
        Flight::json($category);
    } else {
        Flight::halt(404, 'Category not found');
    }
});

Flight::route('POST /categories', function() use ($dao) {
    $data = Flight::request()->data->getData();
    Flight::json($dao->insert($data));
});

Flight::route('PUT /categories/@id', function($id) use ($dao) {
    $data = Flight::request()->data->getData();
    Flight::json($dao->update($id, $data));
});

Flight::route('DELETE /categories/@id', function($id) use ($dao) {
    Flight::json($dao->delete($id));
});

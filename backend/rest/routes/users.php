<?php
require_once __DIR__ . '/../../services/UserService.php';

$service = new UserService();

Flight::route('GET /users', function() use ($service) {
    Flight::json($service->getAll());
});

Flight::route('GET /users/@id', function($id) use ($service) {
    $user = $service->getById($id);
    if ($user) {
        Flight::json($user);
    } else {
        Flight::halt(404, 'User not found');
    }
});

Flight::route('POST /users', function() use ($service) {
    $data = Flight::request()->data->getData();
    $service->validateUser($data);
    Flight::json($service->create($data));
});

Flight::route('PUT /users/@id', function($id) use ($service) {
    $data = Flight::request()->data->getData();
    $service->validateUser($data);
    Flight::json($service->update($id, $data));
});

Flight::route('DELETE /users/@id', function($id) use ($service) {
    Flight::json($service->delete($id));
});

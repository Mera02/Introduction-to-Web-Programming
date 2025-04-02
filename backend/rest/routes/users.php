<?php
require_once __DIR__ . '/../../dao/UserDao.php';

$dao = new UserDao();

// GET – vrati sve korisnike
Flight::route('GET /users', function() use ($dao) {
    Flight::json($dao->getAll());
});

// GET – vrati korisnika po ID-u
Flight::route('GET /users/@id', function($id) use ($dao) {
    $user = $dao->getById($id);
    if ($user) {
        Flight::json($user);
    } else {
        Flight::halt(404, 'User not found');
    }
});

// POST – kreiraj korisnika
Flight::route('POST /users', function() use ($dao) {
    $data = Flight::request()->data->getData();
    Flight::json($dao->insert($data));
});

// PUT – update korisnika
Flight::route('PUT /users/@id', function($id) use ($dao) {
    $data = Flight::request()->data->getData();
    Flight::json($dao->update($id, $data));
});

// DELETE – izbriši korisnika
Flight::route('DELETE /users/@id', function($id) use ($dao) {
    Flight::json($dao->delete($id));
});

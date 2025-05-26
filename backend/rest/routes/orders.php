<?php
require_once __DIR__ . '/../../services/OrderService.php';
require_once __DIR__ . '/../../middleware/AuthMiddleware.php';


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$service = new OrderService();


Flight::route('GET /orders', function() use ($service) {
    try {
        AuthMiddleware::check();
        AuthMiddleware::requireRole('admin');

        $orders = $service->getAllWithDetails();
        Flight::json($orders);
    } catch (Exception $e) {
        Flight::json(['error' => $e->getMessage()], 500);
    }
});


Flight::route('GET /orders/@id', function($id) use ($service) {
    try {
        AuthMiddleware::check();
        $order = $service->getById($id);
        if ($order) {
            Flight::json($order);
        } else {
            Flight::halt(404, 'Order not found');
        }
    } catch (Exception $e) {
        Flight::json(['error' => $e->getMessage()], 500);
    }
});


Flight::route('POST /orders', function() use ($service) {
    try {
        AuthMiddleware::check();

        $data = Flight::request()->data->getData();
        if (!isset($data['user_id']) || !isset($data['items'])) {
            Flight::halt(400, "Nedostaju podaci za narudžbu.");
        }

        Flight::json($service->create($data));
    } catch (Exception $e) {
        Flight::json(['error' => $e->getMessage()], 500);
    }
});


Flight::route('PUT /orders/@id', function($id) use ($service) {
    try {
        AuthMiddleware::check();
        AuthMiddleware::requireRole('admin');

        $data = Flight::request()->data->getData();
        Flight::json($service->update($id, $data));
    } catch (Exception $e) {
        Flight::json(['error' => $e->getMessage()], 500);
    }
});


Flight::route('DELETE /orders/@id', function($id) use ($service) {
    try {
        AuthMiddleware::check();
        AuthMiddleware::requireRole('admin');
        Flight::json($service->delete($id));
    } catch (Exception $e) {
        Flight::json(['error' => $e->getMessage()], 500);
    }
});

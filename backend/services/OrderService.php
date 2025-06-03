<?php
require_once 'BaseService.php';
require_once __DIR__ . '/../dao/OrderDao.php';
require_once 'OrderItemService.php';

class OrderService extends BaseService {
    private $orderItemService;

    public function __construct() {
        $dao = new OrderDao();
        parent::__construct($dao);
        $this->orderItemService = new OrderItemService();
    }

    public function create($data) {
        $items = $data['items'];
        $user_id = $data['user_id'];

        $total = 0;
        foreach ($items as $item) {
            $total += $item['price'] * $item['quantity'];
        }

        $order_id = $this->dao->insert([
            'user_id' => $user_id,
            'total_price' => $total,
            'status' => 'pending',
            'created_at' => date('Y-m-d H:i:s')
        ]);

        foreach ($items as $item) {
            $this->orderItemService->create([
                'order_id' => $order_id,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'subtotal' => $item['price'] * $item['quantity']
            ]);
        }

        return ['id' => $order_id, 'total_price' => $total];
    }

    public function getByUserId($user_id) {
        return $this->dao->getByUserId($user_id);
    }

    public function getAllWithDetails() {
        $raw = $this->dao->getAllWithDetails();

        $grouped = [];
        foreach ($raw as $row) {
            $id = $row['order_id'];
            if (!isset($grouped[$id])) {
                $grouped[$id] = [
                    'id' => $id,
                    'created_at' => $row['created_at'],
                    'total' => $row['total_price'],
                    'user_email' => $row['user_email'],
                    'items' => []
                ];
            }

            $grouped[$id]['items'][] = [
                'name' => $row['product_name'],
                'quantity' => $row['quantity']
            ];
        }

        return array_values($grouped);
    }
}

<?php
require_once 'BaseDao.php';

class OrderDao extends BaseDao {
    public function __construct() {
        parent::__construct("orders");
    }

    public function getByUserId($user_id) {
        $stmt = $this->conn->prepare("SELECT * FROM orders WHERE user_id = :user_id");
        $stmt->bindParam(":user_id", $user_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getAllWithDetails() {
        $stmt = $this->conn->prepare("
            SELECT 
                o.id AS order_id,
                o.created_at,
                o.total_price,
                u.email AS user_email,
                oi.quantity,
                p.name AS product_name
            FROM orders o
            JOIN users u ON o.user_id = u.id
            JOIN order_items oi ON o.id = oi.order_id
            JOIN products p ON oi.product_id = p.id
            ORDER BY o.created_at DESC
        ");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

?>

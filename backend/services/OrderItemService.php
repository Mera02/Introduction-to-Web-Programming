<?php
require_once 'BaseService.php';
require_once __DIR__ . '/../dao/OrderItemDao.php';

class OrderItemService extends BaseService {
    public function __construct() {
        $dao = new OrderItemDao();
        parent::__construct($dao);
    }

}

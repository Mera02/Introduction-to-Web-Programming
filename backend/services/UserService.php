<?php
require_once 'BaseService.php';
require_once __DIR__ . '/../dao/UserDao.php';

class UserService extends BaseService {
    public function __construct() {
        $dao = new UserDao();
        parent::__construct($dao);
    }

    public function getByEmail($email) {
        return $this->dao->getByEmail($email);
    }

    public function validateUser($user) {
        if (!isset($user['first_name']) || empty(trim($user['first_name']))) {
            throw new Exception("First name is required.");
        }

        if (!isset($user['last_name']) || empty(trim($user['last_name']))) {
            throw new Exception("Last name is required.");
        }

        if (!isset($user['email']) || !filter_var($user['email'], FILTER_VALIDATE_EMAIL)) {
            throw new Exception("Valid email is required.");
        }

        $existingUser = $this->dao->getByEmail($user['email']);
        if ($existingUser) {
            throw new Exception("Email already exists.");
        }

        if (!isset($user['password']) || strlen($user['password']) < 6) {
            throw new Exception("Password must be at least 6 characters.");
        }

        if (!isset($user['phone']) || !preg_match('/^\d{8,}$/', $user['phone'])) {
            throw new Exception("Phone number must have at least 8 digits.");
        }
    }

    public function register($user) {
        $user['role'] = isset($user['role']) && $user['role'] === 'admin' ? 'admin' : 'user';

        $this->validateUser($user);

        $user['password'] = password_hash($user['password'], PASSWORD_DEFAULT);

        return $this->dao->add($user);
    }
}

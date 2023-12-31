const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employees.controller');

router.get('/employees', EmployeeController.getAll);
router.get('/employees/random', EmployeeController.getRandom);
router.get('/employees/:id', EmployeeController.getById);
router.post('/employees', EmployeeController.postOne);
router.put('/employees', EmployeeController.putById);
router.delete('/employees', EmployeeController.deleteById);

module.exports = router;

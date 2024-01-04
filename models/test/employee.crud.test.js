const Employee = require('../employee.model.js');
const Department = require('../department.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

    // Connect to the database before running any tests
    before(async () => {
        try {
          await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
        } catch(err) {
          console.error(err);
        }
    });

    describe('Reading data', () => {
        before(async () => {
            const testEmpOne = new Employee({ firstName: 'firstName #1', lastName: 'lastName #1', department: 'department #1',});
            await testEmpOne.save();
        
            const testEmpTwo = new Employee({ firstName: 'firstName #2', lastName: 'lastName #2', department: 'department #2',});
            await testEmpTwo.save();
          });
    
        it('should return all the data with "find" method', async () => {
            const employees = await Employee.find();
            const expectedLength = 2;
            expect(employees.length).to.be.equal(expectedLength);
        });
        it('should return a proper document by various params with "findOne" method', async () => {
            const employee1 = await Employee.findOne({ firstName: 'firstName #1' });
            const expectedFirstName = 'firstName #1';
            expect(employee1.firstName).to.be.equal(expectedFirstName);

            const employee2 = await Employee.findOne({ lastName: 'lastName #1' });
            const expectedLastName = 'lastName #1';
            expect(employee2.lastName).to.be.equal(expectedLastName);

            const employee3 = await Employee.findOne({ department: 'department #1' });
            const expectedDepartment = 'department #1';
            expect(employee3.department).to.be.equal(expectedDepartment);
        });
        after(async () => {
            await Employee.deleteMany();
        });
    });
    describe('Creating data', () => {
        it('should insert new document with "insertOne" method', async () => {
            const employee = new Employee({ firstName: 'firstName #1', lastName: 'lastName #1', department: 'department #1'});
            await employee.save();
            //const savedEmployee = await Employee.findOne({ firstName: 'firstName #1' });
            //expect(savedEmployee).to.not.be.null;
            expect(employee.isNew).to.be.false;
        });
        after(async () => {
            await Employee.deleteMany();
        });
    });
    describe('Updating data', () => {
        beforeEach(async () => {
            const testEmpOne = new Employee({ firstName: 'firstName #1', lastName: 'lastName #1', department: 'department #1',});
            await testEmpOne.save();
        
            const testEmpTwo = new Employee({ firstName: 'firstName #2', lastName: 'lastName #2', department: 'department #2',});
            await testEmpTwo.save();
          });
        it('should properly update one document with "updateOne" method', async () => {
            await Employee.updateOne({ firstName: 'firstName #1' }, { $set: { firstName: '=firstName #1=' }});
            const updatedEmployee = await Employee.findOne({ firstName: '=firstName #1=' });
            expect(updatedEmployee).to.not.be.null;
        });
        it('should properly update one document with "save" method', async () => {
            const employee = await Employee.findOne({ firstName: 'firstName #1' });
            employee.firstName = '=firstName #1=';
            await employee.save();
          
            const updatedEmployee = await Employee.findOne({ firstName: '=firstName #1=' });
            expect(updatedEmployee).to.not.be.null;
        });
        it('should properly update multiple documents with "updateMany" method', async () => {
            await Employee.updateMany({}, { $set: { firstName: 'Updated!' }});
            const employees = await Employee.find({ firstName: 'Updated!' });
            expect(employees.length).to.be.equal(2);
        });
        afterEach(async () => {
            await Employee.deleteMany();
        });
    });
    describe('Removing data', () => {
        beforeEach(async () => {
            const testEmpOne = new Employee({ firstName: 'firstName #1', lastName: 'lastName #1', department: 'department #1',});
            await testEmpOne.save();
        
            const testEmpTwo = new Employee({ firstName: 'firstName #2', lastName: 'lastName #2', department: 'department #2',});
            await testEmpTwo.save();
        });
        it('should properly remove one document with "deleteOne" method', async () => {
            await Employee.deleteOne({ firstName: 'firstName #1' });
            const removeEmployee = await Employee.findOne({ firstName: 'firstName #1' });
            expect(removeEmployee).to.be.null;
        });
        it('should properly remove multiple documents with "deleteMany" method', async () => {
            await Employee.deleteMany();
            const employees = await Employee.find();
            expect(employees.length).to.be.equal(0);
        });
        afterEach(async () => {
            await Employee.deleteMany();
          });
    });
    describe('Reading data', () => {
        before(async () => {
            const testDepOne = new Department({ name: 'Department #1' });
            await testDepOne.save();
        
            const testEmpTwo = new Employee({ firstName: 'firstName #2', lastName: 'lastName #2', department: testDepOne._id,});
            await testEmpTwo.save();
          });
        it('should populate department as objects', async () => {
            const employees = await Employee.find().populate('department');

            // Sprawdź, czy 'department' jest obiektem, a nie tylko referencyjnym id
            employees.forEach(employee => {
                expect(employee.department).to.be.an('object');
                expect(employee.department).to.not.be.an.instanceof(mongoose.Types.ObjectId);
            });
        });
        after(async () => {
            await Employee.deleteMany();
            await Department.deleteMany();
        });
    });
    // Clear the mongoose models after running any tests
    after(async () => {
        mongoose.models = {};
    });
});


const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

    it('should throw an error if "firstName", "lastName", "department" are missing', () => {
        const emp = new Employee({});

        emp.validateSync(err => {
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.department).to.exist;
        });
    });
    it('should throw an error if "firstName", "lastName", "department" are not a string', () => {

        const cases = [
            { firstName: [], lastName: [], department: [] },
            { firstName: {}, lastName: {}, department: {} }
        ];
        for(let name of cases) {
          const emp = new Employee({ name });
      
          emp.validateSync(err => {
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.department).to.exist;
          });
        }
      });
    it('should not throw an error if "firstName", "lastName", "department" is okay', () => {
        const cases = [
            { firstName: 'lorem', lastName: 'lorem', department: 'lorem' },
            { firstName: 'impsum', lastName: 'impsum', department: 'impsum' },
        ];
        for(let name of cases) {
          const dep = new Employee({ name });
      
          dep.validateSync(err => {
            expect(err).to.not.exist;
          });
        }
    });
    after(() => {
      mongoose.models = {};
    });
  });
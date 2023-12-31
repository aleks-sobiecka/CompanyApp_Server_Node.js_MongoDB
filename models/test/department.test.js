const Department = require('../department.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Department', () => {

    it('should throw an error if no "name" arg', () => {
        const dep = new Department({}); // create new Department, but don't set `name` attr value

        dep.validateSync(err => {
        expect(err.errors.name).to.exist;
        });

    });
    it('should throw an error if "name" is not a string', () => {

        const cases = [{}, []];
        for(let name of cases) {
          const dep = new Department({ name });
      
          dep.validateSync(err => {
            expect(err.errors.name).to.exist;
          });
        }
      });
    it('should throw an error if "name" lenght is not correct', () => {
        const cases = ['111', '1111111111111111111111'];
        for(let name of cases) {
          const dep = new Department({ name });
      
          dep.validateSync(err => {
            expect(err.errors.name).to.exist;
          });
        }
    });
    it('should not throw an error if "name" is okay', () => {
        const cases = ['Management', 'Human Resources'];
        for(let name of cases) {
          const dep = new Department({ name });
      
          dep.validateSync(err => {
            expect(err).to.not.exist;
          });
        }
    });

    after(() => {
        mongoose.models = {};
      });
  
  });
'use strict'
const { expect } = require('chai');
const { stub } = require('sinon');
const mock = require('mock-require');

const fixture = {
    db: {
        models: {
            applications: class {
                constructor({id, name, category, averageAge, sumOfAges, numOfInstallers}) {
                    this.id = id;
                    this.name  = name;
                    this.category = category;
                    this.averageAge = averageAge,
                    this.sumOfAges = sumOfAges,
                    this.numOfInstallers = numOfInstallers
                }
            }
        }
    },
    defaultParams: {}
}

mock('../../src/db', fixture.db);
mock.stop('../../src/services/service');
const service = require('../../src/services/service');

describe('Rank service', () => {
    beforeEach(() => {
        const {db, defaultParams } = fixture;
        Object.assign(defaultParams, {
          age: 20,
          name: 'facebook',
          category: 'social',
          randomNumber: 1,
          numOfInstallers: 2,
          sumOfAges: 40,
        });
        db.models.applications.aggregate = () => {};
        db.models.applications.find = () => {};
        db.models.applications.findOne = () => {};
        db.models.applications.findOne = () => {};
        db.models.applications.findOneAndUpdate = () => {};
      });

    describe('get relevant app by bronze strategy', () => {
    it('app should return maximum 2 apps', async() => {
         const {db, defaultParams} = fixture;
           stub(db.models.applications, 'aggregate').returns(Promise.resolve([{data: 'data'}, {data2: 'data2'}]));
           const result = await service.getBronzeStrategy({category: defaultParams.category});
           expect(result).to.be.length(2);
        });
    });

    describe('get relevant app by silver strategy', () => {
        it('app should return maximum 1 apps which is the random number', async() => {
            const {db, defaultParams} = fixture;
            stub(db.models.applications, 'aggregate').returns(Promise.resolve([{data: 'data'}]));
            const result = await service.getSilverStrategy({category: defaultParams.category});
            expect(result).to.be.length(1);
        });
    });

    describe('get relevant app by gold strategy', () => {
        it('app should return maximum 2 apps ordered by age closets to the user age', async() => {
            const {db, defaultParams} = fixture;
            stub(db.models.applications, 'find').returns(Promise.resolve(
                [
                    {averageAge: 30},
                    {averageAge: 28},
                    {averageAge: 27},
                    {averageAge: 25}
                ]
                ));
            const result = await service.getGoldStrategy({age: defaultParams.age,category: defaultParams.category});
            expect(result).to.eql([{averageAge: 25}, {averageAge: 27}]);
        });
    });

    describe('install new app for user', () => {
        it('should update the age average of the app', async() => {
            const {db, defaultParams} = fixture;
            stub(db.models.applications, 'findOne').returns(Promise.resolve(
                {
                    name: defaultParams.name,
                    sumOfAges: defaultParams.sumOfAges,
                    numOfInstallers: defaultParams.numOfInstallers
                }
                ));
                stub(db.models.applications, 'findOneAndUpdate').returns(Promise.resolve(
                    {
                        name: defaultParams.name,
                        sumOfAges: defaultParams.sumOfAges + 20,
                        numOfInstallers: defaultParams.numOfInstallers + 1
                    }
                    ));
            const result = await service.installApplication({age: defaultParams.age,name: defaultParams.name});
            expect(result).to.eql(                    {
                name: defaultParams.name,
                sumOfAges: defaultParams.sumOfAges + 20,
                numOfInstallers: defaultParams.numOfInstallers + 1
            });
        });
    });
})
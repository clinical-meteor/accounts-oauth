import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { chai } from 'meteor/practicalmeteor:chai';
import { expect } from 'meteor/practicalmeteor:chai';

describe('clinical:default-landing-page', function () {
  beforeEach(function () {
    //console.log('beforeEach');
  });
  afterEach(function () {
    //console.log('afterEach');
  });
  it('Accounts exists globally', function () {
    expect(Accounts).to.exist;
  });
  it('Accounts.oauth exists globally', function () {
    expect(Accounts.oauth).to.exist;
  });
});
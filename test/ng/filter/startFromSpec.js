'use strict';

describe('Filter: startFrom', function() {
  var items;
  var str;
  var startFrom;

  beforeEach(inject(function($filter) {
    items = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    str = "tuvwxyz";
    startFrom = $filter('startFrom');
  }));


  it('should skip the first X items when X is positive', function() {
    expect(startFrom(items, 5)).toEqual(['f', 'g', 'h']);
    expect(startFrom(items, '5')).toEqual(['f', 'g', 'h']);
    expect(startFrom(str, 4)).toEqual("xyz");
    expect(startFrom(str, '4')).toEqual("xyz");
  });


  it('should keep the last X items when X is negative', function() {
    expect(startFrom(items, -3)).toEqual(['f', 'g', 'h']);
    expect(startFrom(str, '-3')).toEqual("xyz");
  });


  it('should not modify the source array', function() {
    startFrom(items, 3);
    expect(items.length).toBe(8);
  });


  it('should return everything when X cannot be parsed', function() {
    expect(startFrom(items, 'bogus')).toEqual(items);
    expect(startFrom(items, null)).toEqual(items);
    expect(startFrom(items, undefined)).toEqual(items);
    expect(startFrom(str, 'bogus')).toEqual(str);
  });


  it('should return an empty array/string when X exceeds the length', function() {
    expect(startFrom(items, 100)).toEqual([]);
    expect(startFrom(str, 100)).toEqual("");
  });


  it('should return input unchanged if it is neither array nor string', function() {
    expect(startFrom(null, 1)).toBeNull();
    expect(startFrom(undefined, 1)).toBeUndefined();
    var obj = {};
    expect(startFrom(obj, 1)).toBe(obj);
  });


  it('should paginate when chained with limitTo', inject(function($filter) {
    var limitTo = $filter('limitTo');
    expect(limitTo(startFrom(items, 3), 3)).toEqual(['d', 'e', 'f']);
    expect(limitTo(startFrom(items, 6), 3)).toEqual(['g', 'h']);
  }));
});

'use strict';

/**
 * @ngdoc function
 * @name ng.filter:startFrom
 * @function
 *
 * @description
 * Creates a new array or string that skips the first `start` elements of the source. It is the
 * counterpart of {@link ng.filter:limitTo limitTo} and the two are typically chained to paginate:
 * `items | startFrom:page*size | limitTo:size`.
 *
 * If `start` is negative, it is counted from the end of the source (so `-2` keeps the last two
 * elements). A `start` that cannot be parsed is treated as `0`, and a `start` that exceeds the
 * length of the source yields an empty array/string.
 *
 * @param {Array|string} input Source array or string to be sliced.
 * @param {string|number} start Number of elements to skip from the beginning (or, if negative,
 *     the number of elements to keep from the end).
 * @returns {Array|string} A new sub-array or substring without the first `start` elements. Input
 *     of any other type is returned unchanged.
 *
 * @example
   <doc:example>
     <doc:source>
       <script>
         function Ctrl($scope) {
           $scope.numbers = [1,2,3,4,5,6,7,8,9];
           $scope.pageSize = 3;
           $scope.page = 0;
         }
       </script>
       <div ng-controller="Ctrl">
         Page size: <input type="integer" ng-model="pageSize">
         Page: <input type="integer" ng-model="page">
         <p>Output: {{ numbers | startFrom:page*pageSize | limitTo:pageSize }}</p>
       </div>
     </doc:source>
     <doc:scenario>
       it('should show the first page', function() {
         expect(binding('numbers | startFrom:page*pageSize | limitTo:pageSize')).toEqual('[1,2,3]');
       });

       it('should show the second page', function() {
         input('page').enter(1);
         expect(binding('numbers | startFrom:page*pageSize | limitTo:pageSize')).toEqual('[4,5,6]');
       });
     </doc:scenario>
   </doc:example>
 */
function startFromFilter(){
  return function(input, start) {
    if (!isArray(input) && !isString(input)) return input;

    start = int(start) || 0;

    return input.slice(start);
  };
}

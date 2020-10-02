(function () {
  'use strict';

  window._ = {};
  // Underbar part II

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function (collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    /* START SOLUTION */
    return _.reduce(collection, function (wasFound, item) {
      if (wasFound) {
        return true;
        //wasFound will keep returning true
      }
      return item === target;
    }, false);
    /* END SOLUTION */
  };


  // Determine whether all of the elements match a truth test.
  _.every = function (collection, iterator) {
    // TIP: Try re-using reduce() here.
    /* START SOLUTION */
    // if (arguments.length < 2){

    // }
    return _.reduce(collection, function (allTrue, item) {
      if (!allTrue) {
        return false;
      }
      //look at the spec and check iterator function, returns value 
      //!! forces the type to become boolean
      if (iterator == undefined) {
        return !!item;
      }
      else {
        return !!iterator(item);
      }
    },

      true)
    /* END SOLUTION */
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function (collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    /* START SOLUTION */
    console.log(!_.identity({}))
    // iterator = !iterator don't change the iterator
    // if not all elements are false then return true for some
    iterator = iterator || _.identity
    return !_.every(collection, function (item) {
      return !iterator(item)
    })

    //getting false for [true, {}, 1]
    //  iterator = !_.identity = !val
    //  [false, , false]

    /* END SOLUTION */
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   let obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function (obj) {//this is args, an array-like object with length property
    /* START SOLUTION */
    // _.each(arguments, function (args) {
    //   for (let key in args) {
    //     obj[key] = args[key]
    //   }
    // });
    // return obj
    return _.reduce(arguments, function (accumulator, toMerge) {
      // using arguments or eval as identifier is not allowed in strict mode
      for (let key in toMerge) {
        accumulator[key] = toMerge[key]
      } 
      return accumulator
    })
  /* END SOLUTION */
};

// Like extend, but doesn't ever overwrite a key that already
// exists in obj
_.defaults = function (obj) {
  /* START SOLUTION */
  _.each(arguments, function (args) {
    for (let key in args) {
      if (!obj.hasOwnProperty(key)) {
        obj[key] = args[key]
      }
    }
  });
  return obj
  /* END SOLUTION */
};


/**
 * FUNCTIONS
 * =========
 *
 * Now we're getting into function decorators, which take in any function
 * and return out a new version of the function that works somewhat differently
 */

// Return a function that can be called at most one time. Subsequent calls
// should return the previously returned value.
_.once = function (func) {
  // TIP: These variables are stored in a "closure scope" (worth researching),
  // so that they'll remain available to the newly-generated function every
  // time it's called. Closure is where the function value persists, whereas normally
  // function values disappears when function is called
  /* START SOLUTION */
  // Need to read Javascript advanced functions: https://javascript.info/call-apply-decorators#func-apply
  let alreadyCalled = false;
  let result;
  // the result from this inner function is persisted, so next time .once is called, it'll remember
  return function () {
    if (!alreadyCalled) {
      result = func.apply(this, arguments);
      alreadyCalled = true;
    }
    return result;
  };

  // if (func() == undefined) {
  //   let value = func()
  // }
  // else {
  //   return func()
  // } 
  // if function already has value, return the previous value
  /* END SOLUTION */
};

// Memorize an expensive function's results by storing them. You may assume
// that the function only takes primitives as arguments.
// memoize could be renamed to oncePerUniqueArgumentList; memoize does the
// same thing as once, but based on many sets of unique arguments.
//
// _.memoize should return a function that, when called, will check if it has
// already computed the result for the given argument and return that value
// instead if possible.
_.memoize = function (func) {
  /* START SOLUTION */

  let cache = new Map();
  return function () {
    let key = hash(arguments); // (*)
    if (cache.has(key)) {
      return cache.get(key);
    }

    let result = func.call(this, ...arguments); // (**)

    cache.set(key, result);
    return result;
  };

  function hash(args) {
    return args[0] + ',' + args[1];
  }
  //json.stringify
  /* END SOLUTION */
};

// Delays a function for the given number of milliseconds, and then calls
// it with the arguments supplied.
//
// The arguments for the original function are passed after the wait
// parameter. For example _.delay(someFunction, 500, 'a', 'b') will
// call someFunction('a', 'b') after 500ms
_.delay = function (func, wait) {
  /* START SOLUTION */
  // 2 arguments after wait
  //setTime (function(args) = this.apply(null, args), wait)
  /* END SOLUTION */
};


/**
 * ADVANCED COLLECTION OPERATIONS
 * ==============================
 */
// Randomizes the order of an array's contents.
//
// TIP: This function's test suite will ask that you not modify the original
// input array. For a tip on how to make a copy of an array, see:
// http://mdn.io/Array.prototype.slice
_.shuffle = function (array) {
  /* START SOLUTION */
  //start with array and for each, switch it with a random i
  let copy = array.slice(0);
  for (let i = 0; i < array.length; i++) {
    let position = Math.floor(Math.random() * array.length);
    let tamp = copy[i]
    copy[i] = copy[position]
    copy[position] = tamp;
  }
  return copy
  /* END SOLUTION */
};


/**
 * ADVANCED
 * =================
 *
 * Note: This is the end of the pre-course curriculum. Feel free to continue,
 * but nothing beyond here is required.
 */

// Calls the method named by functionOrKey on each value in the list.
// Note: You will need to learn a bit about .apply to complete this.
_.invoke = function (collection, functionOrKey, args) {
  /* START SOLUTION */

  /* END SOLUTION */
};

// Sort the object's values by a criterion produced by an iterator.
// If iterator is a string, sort objects by that property with the name
// of that string. For example, _.sortBy(people, 'name') should sort
// an array of people by their name.
_.sortBy = function (collection, iterator) {
  /* START SOLUTION */

  /* END SOLUTION */
};

// Zip together two or more arrays with elements of the same index
// going together.
//
// Example:
// _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
_.zip = function () {
  /* START SOLUTION */

  /* END SOLUTION */
};

// Takes a multidimensional array and converts it to a one-dimensional array.
// The new array should contain all elements of the multidimensional array.
//
// Hint: Use Array.isArray to check if something is an array
_.flatten = function (nestedArray, result) {
  /* START SOLUTION */

  /* END SOLUTION */
};

// Takes an arbitrary number of arrays and produces an array that contains
// every item shared between all the passed-in arrays.
_.intersection = function () {
  /* START SOLUTION */

  /* END SOLUTION */
};

// Take the difference between one array and a number of other arrays.
// Only the elements present in just the first array will remain.
_.difference = function (array) {
  /* START SOLUTION */

  /* END SOLUTION */
};

// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time.  See the Underbar readme for extra details
// on this function.
//
// Note: This is difficult! It may take a while to implement.
_.throttle = function (func, wait) {
  /* START SOLUTION */

  /* END SOLUTION */
};


// Returns whatever value is passed as the argument. This function doesn't
// seem very useful, but remember it--if a function needs to provide an
// iterator when the user does not pass one in, this will be handy.
_.identity = function (val) {
  return val;
};

/**
 * COLLECTIONS
 * ===========
 *
 * In this section, we'll have a look at functions that operate on collections
 * of values; in JavaScript, a 'collection' is something that can contain a
 * number of values--either an array or an object.
 *
 *
 * IMPORTANT NOTE!
 * ===========
 *
 * The .first function is implemented for you, to help guide you toward success
 * in your work on the following functions. Whenever you see a portion of the
 * assignment pre-completed, be sure to read and understand it fully before
 * you proceed. Skipping this step will lead to considerably more difficulty
 * implementing the sections you are responsible for.
 */

// Return an array of the first n elements of an array. If n is undefined,
// return just the first element.
_.first = function (array, n) {
  return n === undefined ? array[0] : array.slice(0, n);
};

// Like first, but for the last elements. If n is undefined, return just the
// last element.
_.last = function (array, n) {
  // When the input n not is provided, we return a single value from the array,
  // rather than an array of values
  if (n === undefined) {
    return array[array.length - 1];
  }
  return array.slice(Math.max(0, array.length - n));
};

// Call iterator(value, key, collection) for each element of collection.
// Accepts both arrays and objects.
//
// Note: _.each does not have a return value, but rather simply runs the
// iterator function over each item in the input collection.
_.each = function (collection, iterator) {
  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      iterator(collection[i], i, collection);
    }
  } else {
    for (let prop in collection) {
      iterator(collection[prop], prop, collection);
    }
  }
};

// Returns the index at which value can be found in the array, or -1 if value
// is not present in the array.
_.indexOf = function (array, target) {
  // TIP: Here's an example of a function that needs to iterate, which we've
  // implemented for you. Instead of using a standard `for` loop, though,
  // it uses the iteration helper `each`, which you will need to write.
  let result = -1;

  _.each(array, function (item, index) {
    if (item === target && result === -1) {
      result = index;
    }
  });

  return result;
};

// Return all elements of an array that pass a truth test.
_.filter = function (collection, test) {
  let result = [];

  _.each(collection, function (val) {
    test(val) && result.push(val);
  });

  return result;
};

// Return all elements of an array that don't pass a truth test.
_.reject = function (collection, test) {
  // TIP: see if you can re-use _.filter() here, without simply
  // copying code in and modifying it
  return _.filter(collection, function (val) {
    return !test(val);
  });
};

// Produce a duplicate-free version of the array.
_.uniq = function (array, isSorted, iterator) {
  let hash = {};

  iterator = (isSorted && iterator) || _.identity;

  _.each(array, function (val) {
    let transformed = iterator(val);
    if (hash[transformed] === undefined) {
      hash[transformed] = val;
    }
  });

  return _.map(hash, function (value) {
    return value;
  });
};


// Return the results of applying an iterator to each element.
_.map = function (collection, iterator) {
  // map() is a useful primitive iteration function that works a lot
  // like each(), but in addition to running the operation on all
  // the members, it also maintains an array of results.
  let results = [];

  _.each(collection, function (item, index, collection) {
    results.push(iterator(item, index, collection));
  });

  return results;
};

/*
 * TIP: map is really handy when you want to transform an array of
 * values into a new array of values. _.pluck() is solved for you
 * as an example of this.
 */

// Takes an array of objects and returns and array of the values of
// a certain property in it. E.g. take an array of people and return
// an array of just their ages
_.pluck = function (collection, key) {
  // TIP: map is really handy when you want to transform an array of
  // values into a new array of values. _.pluck() is solved for you
  // as an example of this.
  return _.map(collection, function (item) {
    return item[key];
  });
};

// Reduces an array or object to a single value by repetitively calling
// iterator(accumulator, item) for each item. accumulator should be
// the return value of the previous iterator call.
//  
// You can pass in a starting value for the accumulator as the third argument
// to reduce. If no starting value is passed, the first element is used as
// the accumulator, and is never passed to the iterator. In other words, in
// the case where a starting value is not passed, the iterator is not invoked
// until the second element, with the first element as its second argument.
//  
// Example:
//   let numbers = [1,2,3];
//   let sum = _.reduce(numbers, function(total, number){
//     return total + number;
//   }, 0); // should be 6
//  
//   let identity = _.reduce([5], function(total, number){
//     return total + number * number;
//   }); // should be 5, regardless of the iterator function passed in
//          No accumulator is given so the first element is used.
_.reduce = function (collection, iterator, accumulator) {
  let initializing = arguments.length === 2;

  _.each(collection, function (val) {
    if (initializing) {
      initializing = false;
      accumulator = val;
    } else {
      accumulator = iterator(accumulator, val);
    }
  });

  return accumulator;
};

}());

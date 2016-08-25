class Maybe {
  constructor(x) {
    this.__value = x
  }

  static of(x) {
    return new Maybe(x)
  }

  isNothing() {
    return this.__value === null || this.__value === undefined
  }

  map(func) {
    if (this.isNothing())
      return Maybe.of(null)
    else
      return Maybe.of(func(this.__value))
  }

  join() {
    if (this.isNothing())
      return Maybe.of(null)
    else
      return this.__value
  }

  chain(func) {
    return Maybe.of(this.__value).map(func).join()
  }

  ap(applicative) {
    return applicative.map(this.__value)
  }
}

// functor
Maybe.of(1).map(x => x + 1) // === Maybe.of(2)
Maybe.of(null).map(x => x + 1) // === Maybe.of(null)

// applicative
Maybe.of(x => y => x + y)
  .ap(Maybe.of(2))
  .ap(Maybe.of(3)) // === Maybe.of(5)

// monad
Maybe.of({a: {b: {c: 1}}})
  .chain(prop('a'))
  .chain(prop('b'))
  .chain(prop('c')) // === Maybe.of(1)

Maybe.of({a: {b: {c: 1}}})
  .chain(prop('a'))
  .chain(prop('b'))
  .chain(prop('c'))
  .chain(prop('d')) // === Maybe.of(null)
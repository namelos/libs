class Stream {
  static head(p) { return p[0] }
  static tail(p) { return p[1]() }
  static of(...xs) { return new Stream(...xs) }

  static show(stream) {
    if (stream != null)
      (console.log(Stream.head(stream)),
        Stream.show(Stream.tail(stream)))
  }

  constructor(...xs) {
    const [head, ...tail] = xs
    if (xs.length === 1) return [head, _ => null]
    else                 return [head, _ => Stream.of(...tail)]
  }

  static map(stream, f) {
    if (stream != null)
      return [
        f(Stream.head(stream)),
        _ => Stream.map(Stream.tail(stream), f)
      ]
    else return null
  }
}

const s = Stream.map(Stream.of(1,2,3,4,5), x => x * x)
Stream.show(s)

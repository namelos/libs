class Stream {
  static of(...xs) { return new Stream(...xs) }

  constructor(...xs) {
    const [head, ...tail] = xs
    this.head = head
    if (xs.length === 1)
      this.tail = _ => null
    else
      this.tail = _ => new Stream(...tail)
  }

  show() {
    const {head, tail} = this

    if (head != null) {
      console.log(head)
      if (tail() != null)
        tail().show()
    }
  }

  map(f) {
    const {head, tail} = this

    if (head != null) {
      this.head = f(head)
      if (tail() != null)
        tail().map(f)
    }
    return this
  }
}

new Stream(1,2,3,4,5).map(x => x * x).show()

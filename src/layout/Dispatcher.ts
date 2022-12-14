/*
Very simple synchronous event dispatcher
*/

type Handler = () => void

export default class Dispatcher {
  private handlers : Handler[] = []

  addHandler (handler: Handler) {
    this.handlers.push(handler)
  }

  dispatch () {
    for (const handler of this.handlers) {
      handler()
    }
  }
}
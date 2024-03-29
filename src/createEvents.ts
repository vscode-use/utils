type EventsMap = Record<string, any>

interface DefaultEvents extends EventsMap {
  [event: string]: (...args: any) => void
}

export interface Unsubscribe {
  (): void
}

export declare class Emitter<Events extends EventsMap = DefaultEvents> {
  /**
   * Event names in keys and arrays with listeners in values.
   *
   * ```js
   * emitter1.events = emitter2.events
   * emitter2.events = { }
   * ```
   */
  events: Partial<{ [E in keyof Events]: Events[E][] }>

  /**
   * Add a listener for a given event.
   *
   * ```js
   * const unbind = ee.on('tick', (tickType, tickDuration) => {
   *   count += 1
   * })
   *
   * disable () {
   *   unbind()
   * }
   * ```
   *
   * @param event The event name.
   * @param cb The listener function.
   * @returns Unbind listener from event.
   */
  on<K extends keyof Events>(this: this, event: K, cb: Events[K]): Unsubscribe

  /**
   * Calls each of the listeners registered for a given event.
   *
   * ```js
   * ee.emit('tick', tickType, tickDuration)
   * ```
   *
   * @param event The event name.
   * @param args The arguments for listeners.
   */
  emit<K extends keyof Events>(
    this: this,
    event: K,
    ...args: Parameters<Events[K]>
  ): void
}

/**
 * 用于订阅事件通信的工具
 */
export function createEvents<Events extends EventsMap = DefaultEvents>(): Emitter<Events> {
  return {
    events: {},
    emit(event, ...args) {
      (this.events[event] || [] as any).forEach((i: any) => i(...args))
    },
    on(event, cb) {
      (this.events[event] = this.events[event] || [] as any).push(cb)
      return () =>
        (this.events[event] = (this.events[event] || [] as any).filter((i: any) => i !== cb))
    },
  }
}

// const event = createEvents()
// const off = event.on('nihao',(data)=>{
//   console.log('12',data)
// })

// event.emit('nihao','xxx')

// off()

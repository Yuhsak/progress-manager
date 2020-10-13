export type ProgressManagerOption = {
  value?: number
  start?: number
  end?: number
  startTime?: Date
  currentTime?: Date
}

export class ProgressManager {

  // state
  private _value: number
  private _cumsum: number
  private _start: number
  private _end?: number
  private _hasEnd?: boolean
  private _startTime?: Date
  private _currentTime?: Date

  // cache
  private _ratio?: number
  private _elapsedMs?: number
  private _eta?: number
  private _msPerUnit?: number
  private _unitPerMs?: number

  constructor({value=0, start=0, end, startTime, currentTime}: ProgressManagerOption={}) {
    this._value = value
    this._start = start
    this._cumsum = Math.abs(value - start)
    this._end = end
    this._startTime = startTime
    this._currentTime = currentTime
    this.update()
  }

  get value() {
    return this._value
  }

  get cumsum() {
    return this._cumsum
  }

  get start() {
    return this._start
  }

  get end() {
    return this._end
  }

  get startTime() {
    return this._startTime
  }

  get currentTime() {
    return this._currentTime
  }

  get hasEnd() {
    return this._hasEnd
  }

  get ratio() {
    return this._ratio
  }

  get elapsedMs() {
    return this._elapsedMs
  }

  get eta() {
    return this._eta
  }

  get msPerUnit() {
    return this._msPerUnit
  }

  get unitPerMs() {
    return this._unitPerMs
  }

  set value(n: number) {
    this._cumsum += Math.abs(this._value - n)
    this._value = n
    this.updateTime()
    this.update()
  }

  set start(n: number) {
    this._start = n
    this.update()
  }

  set end(n: number | undefined) {
    this._end = n
    this.update()
  }

  public setValue(n: number) {
    this.value = n
    return this
  }

  public increment(n: number=1) {
    this.value += n
    return this
  }

  public decrement(n: number=1) {
    this.value -= n
    return this
  }

  private updateTime() {
    const date = new Date()
    if (!this._startTime) {
      this._startTime = date
    }
    this._currentTime = date
  }

  private updateRatio() {
    if (this.end === void(0)) {
      this._ratio = void(0)
      return
    }
    const toEnd = this.end - this.start
    const toValue = this.value - this.start
    const ratio = toEnd === 0 ? 1.0 : (toValue / toEnd)
    this._ratio = Math.max(Math.min(ratio, 1.0), 0)
  }

  private updateElapsedMs() {
    if (!this.startTime || !this.currentTime) {
      this._elapsedMs = void(0)
      return
    }
    this._elapsedMs = Math.max(this.currentTime.getTime() - this.startTime.getTime(), 0)
  }

  private updateMsPerUnit() {
    if (!this.elapsedMs || !this.cumsum) {
      this._msPerUnit = void(0)
      return
    }
    this._msPerUnit = this.elapsedMs / this.cumsum
  }

  private updateUnitPerMs() {
    if (!this.elapsedMs || !this.cumsum) {
      this._unitPerMs = void(0)
      return
    }
    this._unitPerMs = this.cumsum / this.elapsedMs
  }

  private updateETA() {
    if (!this.msPerUnit || this.end === void(0) || this.ratio === void(0)) {
      this._eta = void(0)
      return
    }
    const total = Math.abs(this.end - this.start)
    const remain = total - total * this.ratio
    this._eta = remain * this.msPerUnit
  }

  private update() {
    this.updateRatio()
    this.updateElapsedMs()
    this.updateMsPerUnit()
    this.updateUnitPerMs()
    this.updateETA()
  }

}

export const createProgressManager = (option?: ProgressManagerOption) => new ProgressManager(option)

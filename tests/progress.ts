import {createProgressManager} from '../src'

describe('ProgressManager', () => {

  test('initialize props: no option', () => {
    const p = createProgressManager()
    expect(p.value).toBe(0)
    expect(p.ratio).toBe(void (0))
    expect(p.elapsedMs).toBe(void (0))
    expect(p.unitPerMs).toBe(void (0))
    expect(p.msPerUnit).toBe(void (0))
    expect(p.eta).toBe(void (0))
  })

  test('initialize props: with value', () => {
    const p = createProgressManager({value: 60})
    expect(p.value).toBe(60)
    expect(p.cumsum).toBe(60)
    expect(p.ratio).toBe(void (0))
    expect(p.elapsedMs).toBe(void (0))
    expect(p.unitPerMs).toBe(void (0))
    expect(p.msPerUnit).toBe(void (0))
    expect(p.eta).toBe(void (0))
  })

  test('initialize props: with value, start', () => {
    const p = createProgressManager({value: 60, start: 10})
    expect(p.value).toBe(60)
    expect(p.cumsum).toBe(50)
    expect(p.ratio).toBe(void (0))
    expect(p.elapsedMs).toBe(void (0))
    expect(p.unitPerMs).toBe(void (0))
    expect(p.msPerUnit).toBe(void (0))
    expect(p.eta).toBe(void (0))
  })

  test('initialize props: with value, start, end', () => {
    const p = createProgressManager({value: 60, start: 10, end: 110})
    expect(p.value).toBe(60)
    expect(p.cumsum).toBe(50)
    expect(p.ratio).toBe(0.5)
    expect(p.elapsedMs).toBe(void (0))
    expect(p.unitPerMs).toBe(void (0))
    expect(p.msPerUnit).toBe(void (0))
    expect(p.eta).toBe(void (0))
  })

  test('initialize props: with value, start, end', () => {
    const p = createProgressManager({value: 60, start: 10, end: 110})
    expect(p.value).toBe(60)
    expect(p.cumsum).toBe(50)
    expect(p.ratio).toBe(0.5)
    expect(p.elapsedMs).toBe(void (0))
    expect(p.unitPerMs).toBe(void (0))
    expect(p.msPerUnit).toBe(void (0))
    expect(p.eta).toBe(void (0))
  })

  test('update props: increment after 100 ms', (done) => {
    const p = createProgressManager({value: 60, start: 10, end: 110})
    expect(p.value).toBe(60)
    expect(p.cumsum).toBe(50)
    expect(p.ratio).toBe(0.5)
    expect(p.elapsedMs).toBe(void (0))
    expect(p.unitPerMs).toBe(void (0))
    expect(p.msPerUnit).toBe(void (0))
    expect(p.eta).toBe(void (0))

    setTimeout(() => {
      p.increment(10)
      expect(p.value).toBe(70)
      expect(p.cumsum).toBe(60)
      expect(p.ratio).toBe(0.6)
      expect(p.startTime).toBe(p.currentTime)
      expect(p.elapsedMs).toBe(0)
      expect(p.unitPerMs).toBe(void (0))
      expect(p.msPerUnit).toBe(void (0))
      expect(p.eta).toBe(void (0))
      done()
    }, 100)
  })

  test('update props: increment after 100 ms twice', (done) => {
    const p = createProgressManager({value: 60, start: 10, end: 110})
    expect(p.value).toBe(60)
    expect(p.cumsum).toBe(50)
    expect(p.ratio).toBe(0.5)
    expect(p.elapsedMs).toBe(void (0))
    expect(p.unitPerMs).toBe(void (0))
    expect(p.msPerUnit).toBe(void (0))
    expect(p.eta).toBe(void (0))

    setTimeout(() => {
      p.increment(10)
      expect(p.value).toBe(70)
      expect(p.cumsum).toBe(60)
      expect(p.ratio).toBe(0.6)
      expect(p.currentTime).toBe(p.startTime)
      expect(p.elapsedMs).toBe(0)
      expect(p.unitPerMs).toBe(void (0))
      expect(p.msPerUnit).toBe(void (0))
      expect(p.eta).toBe(void (0))

      setTimeout(() => {
        p.increment(10)
        expect(p.value).toBe(80)
        expect(p.cumsum).toBe(70)
        expect(p.ratio).toBe(0.7)
        expect(p.currentTime).not.toBe(p.startTime)
        expect(p.currentTime).toBeInstanceOf(Date)
        if (p.currentTime && p.startTime) {
          expect(p.elapsedMs).toBe(p.currentTime.getTime() - p.startTime.getTime())
        }
        expect(typeof p.unitPerMs).toBe('number')
        expect(typeof p.msPerUnit).toBe('number')
        expect(typeof p.eta).toBe('number')
        done()
      }, 100)

    }, 100)
  })

  test('cumsum', () => {
    const p = createProgressManager({start: 30, value: 10})
    expect(p.cumsum).toBe(20)
    expect(p.increment(10).cumsum).toBe(30)
    expect(p.decrement(20).cumsum).toBe(50)
    const p2 = createProgressManager({start: -30, value: 10})
    expect(p2.cumsum).toBe(40)
    const p3 = createProgressManager({start: -30, value: -50})
    expect(p3.cumsum).toBe(20)
    expect(p3.increment(10).cumsum).toBe(30)
    expect(p3.decrement(20).cumsum).toBe(50)
  })

  test('ratio', () => {
    const p = createProgressManager({start: 30, value: 10})
    expect(p.ratio).toBe(void(0))
    const p2 = createProgressManager({start: 30, end: 100, value: 10})
    expect(p2.ratio).toBe(0)
    const p3 = createProgressManager({start: 30, end: 100, value: 110})
    expect(p3.ratio).toBe(1)
    const p4 = createProgressManager({start: 30, end: 130, value: 110})
    expect(p4.ratio).toBe(0.8)
    const p5 = createProgressManager({start: -30, end: 70, value: 20})
    expect(p5.ratio).toBe(0.5)
    const p6 = createProgressManager({start: -30, end: -130, value: -80})
    expect(p6.ratio).toBe(0.5)
    const p7 = createProgressManager({start: -30, end: -130, value: -150})
    expect(p7.ratio).toBe(1.0)
  })

})

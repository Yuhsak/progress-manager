# progress-manager

Low level progress manager for Node.js written in TypeScript

## Install

```sh
npm install progress-manager
```

## Usage

```ts
import {createProgressManager} from 'progress-manager'

const progress = createProgressManager()

progress.start // = 0
progress.value // = 0
progress.elapsedMs // = undefined

progress.increment()

progress.value // = 1
progress.elapsedMs // = 0

setTimeout(() => {

  progress.increment()

  progress.value // = 2
  progress.elapsedMs // = close to 1000

}, 1000)

const progressWithEnd = createProgressManager({end: 100})

progressWithEnd.increment(10)

progressWithEnd.value // = 10
progressWithEnd.elapsedMs // = 0

setTimeout(() => {

  progressWithEnd.increment(10)

  progressWithEnd.value // = 20
  progressWithEnd.elapsedMs // = close to 1000
  progressWithEnd.ratio = 0.2
  progressWithEnd.unitPerMs // = close to 0.01
  progressWithEnd.msPerUnit // = close to 100
  progressWithEnd.eta // = close to 8000

}, 1000)
```

## API

### Methods

- `increment(n?: number)`
- `decrement(n?: number)`
- `setValue(n: number)`

### Props

- `value: number`
- `start: number`
- `end?: number`
- `startTime?: number`
- `currentTime?: number`
- `ratio?: number`
- `elapsedMs?: number`
- `unitPerMs?: number`
- `msPerUnit?: number`
- `eta?: number`

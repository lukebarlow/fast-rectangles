import cubicBezier from 'cubic-bezier'
const epsilon = 0.02

const bez = cubicBezier(0.42, 0, 0.58, 1, epsilon)

type Args = {
  startValue: number
  endValue: number
  setter: (value: number) => void
  onEnd?: () => void
  duration?: number
  ease?: (normalizedTime: number) => number
  delay?: number
}

export default function createTransition ({
  startValue,
  endValue,
  setter,
  onEnd,
  duration = 600,
  ease = bez,
  delay = 0
} : Args) {
  let t = 0
  let lastTick = new Date().getTime()
  const tToValue = (t : number) => {
    if (t < delay) {
      return startValue
    }
    const d = endValue - startValue
    return startValue + d * ease((t - delay) / duration)
  }

  const tick = () => {
    const now = new Date().getTime()
    const delta = now - lastTick
    lastTick = now
    t += delta
    t = Math.min(duration + delay, t)
    setter(tToValue(t))
    if (t >= duration + delay) {
      if (onEnd) {
        onEnd()
      }
    }
  }

  return { tick }
}

export interface TimeData {
  days: string
  hours: string
  minutes: string
  seconds: string
}

export default class CountdownTimerService {
  private timeout!: number
  public timeData!: TimeData
  public progress!: number
  public elapsedTime!: number

  constructor (
    private readonly startTime:  number,
    private readonly totalTime:  number,
    private readonly endTime: number,
    private whenTimeEndedFunction?: () => void,
    private whenTimeDataUpdatedFunction?: (data: { timeData: TimeData, progress: number, elapsedTime: number }) => void
  ) {
    this.startTime = startTime
    this.totalTime = totalTime
    this.endTime = endTime

    this.tick(this.startTime, true)
  }

  public start = () => {
    this.timeout = setTimeout(() => this.tick()) as unknown as number
  }

  public destroy = () => {
    clearTimeout(this.timeout)
  }

  private getTimeData = (nowTime: number) => {
    let days = 0
    let hours = 0
    let minutes = 0
    let seconds = 0

    let delta = Math.abs(this.endTime - nowTime) / 1000

    days = Math.floor(delta / 86400)
    delta -= days * 86400

    hours = Math.floor(delta / 3600) % 24
    delta -= hours * 3600

    minutes = Math.floor(delta / 60) % 60
    delta -= minutes * 60

    seconds = delta % 60

    return {
      days: pad(days),
      hours: pad(hours),
      minutes: pad(minutes),
      seconds: pad(seconds)
    }
  }


  private calculateProgress = (nowTime: number): number => {
    const elapsedTime = this.totalTime - (this.endTime - nowTime)
    // const remainingTime = endTime - currentTime

    const progress = (elapsedTime / this.totalTime) * 100

    return Math.min(100, Math.max(0, progress))
  }

  private getElapsedTime = (nowTime: number): number => {
    return nowTime - this.startTime
  }

  private tick = (nowTime = Date.now(), once =  false) => {
    if (nowTime <= this.endTime) {
      !once && (this.timeout = setTimeout(() => this.tick()) as unknown as number)
    } else {
      setTimeout(() => {
        clearTimeout(this.timeout)
        this.whenTimeEndedFunction?.()
      }, 300)
    }

    this.timeData = this.getTimeData(nowTime)
    this.progress = this.calculateProgress(nowTime)
    this.elapsedTime = this.getElapsedTime(nowTime)

    this.whenTimeDataUpdatedFunction?.({
      timeData: this.timeData,
      progress: this.progress,
      elapsedTime: this.elapsedTime
    })
  }
}

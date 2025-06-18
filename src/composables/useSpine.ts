import { Spine } from 'pixi-spine'

export const useSpine = (resource: any) => {
  const animation: any = new Spine(resource.spineData)

  const setVisible = (_visible: boolean) => {
    animation.alpha = _visible ? 1 : 0
  }

  let resolver = () => {}

  const stopAnimation = () => {
    resolver()
    animation.skeleton.setToSetupPose()
    animation.state.tracks = []
  }

  const eventFireCallback = () => {}

  const triggerAnimation = async (
    _animation: string,
    _loop: boolean = false
  ): Promise<void> => {
    stopAnimation()
    setVisible(true)

    return new Promise((resolve: any, reject: any) => {
      resolver = resolve
      if (animation.state.hasAnimation(_animation)) {
        const state = animation.state
        const tracksLength = state.tracks.length

        state.addAnimation(tracksLength, _animation, _loop)
        state.tracks[tracksLength].listener = {
          event: eventFireCallback,
          complete: () => {
            state.clearTrack(tracksLength)
            resolve()
          }
        }
      }
    })
  }

  return {
    animation,
    stopAnimation,
    setVisible,
    triggerAnimation
  }
}

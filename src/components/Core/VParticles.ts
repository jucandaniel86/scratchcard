import { Container, Texture } from 'pixi.js'
import * as particles from 'pixi-particles'

class VParticles extends Container {
  constructor(texture: Texture, settings?: any) {
    super()
    this.name = 'ParticlesContainer'

    let emitter = new particles.Emitter(this, [texture], settings)
    let elapsed = Date.now()

    const update = () => {
      requestAnimationFrame(update)

      var now = Date.now()

      // The emitter requires the elapsed
      // number of seconds since the last update
      emitter.update((now - elapsed) * 0.001)
      elapsed = now
    }

    emitter.emit = true

    //start to update
    // update()
  }
}

export default VParticles

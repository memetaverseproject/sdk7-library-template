// We define the empty imports so the auto-complete feature works as expected.
import { Quaternion, Vector3 } from '@mtvproject/sdk/math'
import { type IEngine } from '@mtvproject/sdk/ecs'
import * as components from '@mtvproject/ecs/dist/components'

/**

 * We need the engine as a param to avoid references to different engines
 * when working on development environments.
 */
export function initLibrary(engine: IEngine) {
  // If we call initLibrary, it will add  the system by default
  engine.addSystem(circularSystem(engine))
}

/**
 * you can export every system and call from your scene the ones that you want to be live.
 * import { engine } from '@mtvproject/sdk/ecs'
 * import { cicrcularSystem } from '@my-library'
 * engine.addSystem(circularSystem(engine))
 */
export function circularSystem(engine: IEngine) {
  const Transform = components.Transform(engine)

  return function circularSystem(dt: number) {
    const entitiesWithSpinner = engine.getEntitiesWith(Transform)
    for (const [entity, _transform] of entitiesWithSpinner) {
      const mutableTransform = Transform.getMutable(entity)

      mutableTransform.rotation = Quaternion.multiply(
        mutableTransform.rotation,
        Quaternion.fromAngleAxis(dt * 100 * Math.random(), Vector3.Up())
      )
    }
  }
}

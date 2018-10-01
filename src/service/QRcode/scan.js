import Instascan from 'instascan'

export const scan = async videoElement => {
  const scanner = new Instascan.Scanner({ video: videoElement })

  const cameras = await Instascan.Camera.getCameras()

  if (cameras.length === 0) throw new Error('no camera found')

  let currentCamera = null

  let resolve = null

  scanner.addListener('scan', content => {
    if (!resolve) return

    switchCamera(null)

    const _resolve = resolve

    resolve = null

    _resolve(content)
  })

  const promise = new Promise(r => (resolve = r))

  const switchCamera = async cameraId => {
    if (currentCamera) await scanner.stop()

    currentCamera = cameras.find(({ id }) => id === cameraId)

    if (currentCamera) await scanner.start(currentCamera)
  }

  return {
    switchCamera,
    cameras,
    promise,
  }
}

import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import testVertexShader from './shaders/test/vertex.glsl'
import testFragmentShader from './shaders/test/fragment.glsl'

/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Test mesh
 */
// Parameters
const parameters = {
    width: 20,
    height: 20,
}

// Geometry
const geometry = new THREE.PlaneGeometry(parameters.width, parameters.height, 32 * parameters.width, 32 * parameters.height)

const count = geometry.attributes.position.count
const randoms = new Float32Array(count)

const randomize = () => {
    for (let i = 0; i < count; i++) {
        randoms[i] = Math.random() * 0.1
    }  
    
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))
}

// Material
const material = new THREE.ShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    side: THREE.DoubleSide,
    uniforms: {
        uTime: {value: 0},
        uPropagation: {value: 0}
    },
    // wireframe: true
})

// Mesh
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

material.uniforms.uPropagation.value = 0

const propagate = () => {
    setInterval(() => {
        if (material.uniforms.uPropagation.value < 2) {
            material.uniforms.uPropagation.value += 0.001
            propagate()
        }
    }, 10)
}

propagate()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, 5)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enabled = false

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    randomize()
    
    // update materials
    material.uniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
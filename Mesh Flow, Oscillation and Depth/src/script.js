import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import testVertexShader from './shaders/test/vertex.glsl'
import testFragmentShader from './shaders/test/fragment.glsl'
import { Vector2 } from 'three'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Test mesh
 */
// Geometry
const parameters = {
    widthFactor: 1,
    heightFactor: 1,
    amplitudeFactor: 0.3,
    speedFactor: 5
}

const planeSize = {
    width: 32*parameters.widthFactor,
    height: 32*parameters.heightFactor
}

const geometry = new THREE.PlaneGeometry(parameters.widthFactor, parameters.heightFactor, planeSize.width, planeSize.height)

const count = geometry.attributes.position.count
const randoms = new Float32Array(count)

const randomize = () => {
    for (let i = 0; i < count; i++) {
        if ((i+1)%(planeSize.width + 1) == 0) {
            randoms[i] = (Math.random()) * parameters.amplitudeFactor*Math.random()
        }
        else {
            randoms[i] = randoms[i+1]
        } 
    }  
    
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))
}

// Material
const material = new THREE.RawShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    uniforms: {
        uFrequency: {value: new Vector2(5, 3)},
        uTime: {value: 0},
        uOscillationFrequency: {value: 5},
        uColor: {value: new THREE.Color('#aa00ff')}
    },
    wireframe: true,
})

// Mesh
let mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
camera.position.set(0, -1, 1)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

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

const runRandomize = () => {
    randomize()
    setTimeout(() => {
        runRandomize()
    }, 50/parameters.speedFactor)
}

runRandomize()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

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

gui.add(parameters, 'speedFactor').min(1).max(10).step(0.001).name("Flow Speed").onFinishChange(randomize)
gui.add(parameters, 'amplitudeFactor').min(-2).max(2).step(0.001).name("Flow Amplitude").onFinishChange(randomize)
gui.add(material.uniforms.uFrequency.value , 'x').min(0).max(25).step(0.001).name("x Frequency").onFinishChange(randomize)
gui.add(material.uniforms.uFrequency.value , 'y').min(0).max(25).step(0.001).name("y Frequency").onFinishChange(randomize)
gui.add(material.uniforms.uOscillationFrequency , 'value').min(0).max(10).step(0.001).name("Oscillation Frequency").onFinishChange(randomize)
gui.add(material, 'wireframe')




// gui.add(material, 'wireframe')



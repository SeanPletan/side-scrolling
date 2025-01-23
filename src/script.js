import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'


const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
// Base camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.set(1,1,3)
scene.add(camera)
// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
//////////////
//GridHelper//
//////////////
//const size = 10; 
//const divisions = 20; 
//const gridHelper = new THREE.GridHelper( size, divisions ); 
//scene.add( gridHelper );
//////////////
//AxesHelper//
//////////////
//const axesHelper = new THREE.AxesHelper( 5 );
//scene.add( axesHelper );


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
const matcapMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

const knotGeometry = new THREE.TorusKnotGeometry(.5, 0.15, 256, 16, 2, 5);
const donut = new THREE.Mesh(knotGeometry, matcapMaterial)
scene.add(donut)

window.addEventListener('resize', () =>
{
    // Update camera
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})









/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    //alpha: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animating
 */
const clock = new THREE.Clock()
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
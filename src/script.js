import * as THREE from 'three'


const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
// Rotating perspective camera
const radius = 2
const height = 2
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.set(0, height, -radius)
camera.lookAt(0, height, -radius * 2)
scene.add(camera)


//////////////
//GridHelper//
//////////////
const size = 20;
const divisions = 20;
const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);



/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
const matcapMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
const knotGeometry = new THREE.TorusKnotGeometry(.5, 0.15, 256, 16, 1, 3);




const mesh = new THREE.InstancedMesh(knotGeometry, matcapMaterial, 1000);
scene.add(mesh);

function getRandomPosition() {
    let x, y, z;

    // Repeat until the position is outside the excluded range
    do {
        // Generate random position between -40 and 40 for x, y, and z
        x = Math.random() * 80 - 40; // Range [-40, 40]
        y = Math.random() * 80 - 40; // Range [-40, 40]
        z = Math.random() * 80 - 40; // Range [-40, 40]
    } while (x >= -5 && x <= 5 && y >= -5 && y <= 5 && z >= -5 && z <= 5); // Check if within the excluded range

    return new THREE.Vector3(x, y, z);
}


const dummy = new THREE.Object3D();
for (let i = 0; i < 1000; i++) {
    const pos = getRandomPosition();

    dummy.position.x = pos.x
    dummy.position.y = pos.y
    dummy.position.z = pos.z

    dummy.rotation.x = Math.random() * 2 * Math.PI;
    dummy.rotation.y = Math.random() * 2 * Math.PI;
    dummy.rotation.z = Math.random() * 2 * Math.PI;

    dummy.scale.x = dummy.scale.y = dummy.scale.z = Math.random();

    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
}









/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animating
 */
const tick = () => {
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

const handleCamera = () => {

    const scrollY = window.scrollY
    const documentHeight = document.documentElement.scrollHeight
    const windowHeight = window.innerHeight
    const scrollPercentage = (scrollY / (documentHeight - windowHeight))


    camera.rotation.y = (-2 * Math.PI * scrollPercentage)
    camera.position.x = (radius * Math.sin(Math.PI * 2 * scrollPercentage))
    camera.position.z = -(radius * Math.cos(Math.PI * 2 * scrollPercentage))
}



window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener("scroll", handleCamera)


tick()
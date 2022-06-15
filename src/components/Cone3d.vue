<template>
  <div ref="canvas" class="contenedor3D"> </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default {
  data() {
    //Scene
    const scene = new THREE.Scene();

    //Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )

    //Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    //TextureLoader
    const textureLoader = new THREE.TextureLoader()
    const map = textureLoader.load(require('../../public/bricks/BaseColor.jpg'))
    const aoMap = textureLoader.load(require('../../public/bricks/Ao.jpg'))
    const roughnessMap = textureLoader.load(require('../../public/bricks/Roughness.jpg'))
    const normalMap = textureLoader.load(require('../../public/bricks/Normal.jpg'))
    const heightMap = textureLoader.load(require('../../public/bricks/Height.png'))

    //Cone
    const geometry = new THREE.ConeGeometry( 1,2,5,300, false,10)
    const material = new THREE.MeshStandardMaterial( {
      map:map,
      aoMap:aoMap,
      roughnessMap: roughnessMap,
      normalMap:normalMap,
      displacementMap:heightMap,
      displacementScale: 0.1
    })
    const cone = new THREE.Mesh( geometry, material);

    //Ligths
    const AmbientalLigth = new THREE.AmbientLight(0xffffff, 1)
    const DirectionalLigth = new THREE.DirectionalLight(0xffffff, 2)

    //EnviromentMap
    const enviromentMap =  new THREE.CubeTextureLoader()
    const envMap =  enviromentMap.load([
      require('../../public/envmap/px.png'),
      require('../../public/envmap/nx.png'),
      require('../../public/envmap/py.png'),
      require('../../public/envmap/ny.png'),
      require('../../public/envmap/pz.png'),
      require('../../public/envmap/nz.png'),
    ])
    

    //Return Data
    return {
      scene: scene,
      camera: camera,
      renderer: renderer,
      cone:cone,
      controls: [],
      AmbientalLigth:AmbientalLigth,
      DirectionalLigth:DirectionalLigth,
      envMap:envMap

    };
  },

  created() {
    this.scene.add(this.camera);
    this.scene.add(this.cone);
    this.camera.position.z = 4

    //Ligth
    this.scene.add(this.AmbientalLigth);
    this.DirectionalLigth.position.set(5,5,5)
    this.scene.add(this.DirectionalLigth);
    
    this.scene.environment = this.envMap
    this.scene.background  = this.envMap
    //Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true

  },

  mounted() {
    this.$refs.canvas.appendChild(this.renderer.domElement);
    this.animate()
  },

  methods: {
        animate() {
          this.renderer.render(this.scene, this.camera)
          requestAnimationFrame(this.animate)
          this.controls.update()
          
        }
    },
};
</script>

<style lang="scss" scoped>
.contenedor3D {
  width: 100%;
  height: 100vh;
  text-align: center;
}
</style>

<template>
  <div ref="canvas" class="contenedor3D" />
</template>

<script>
import * as THREE from "three/build/three.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

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
    );

    //Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    //Load model 3d
    const gltfLoader =  new GLTFLoader()
      // gltfLoader.load(
      //   require('../../public/models/scene.gltf'),
      //   (gltf) => {
      //     scene.add(gltf.scene)
      //   },
      //   () => {
      //     console.log('On progress...');
      //   },
      //   () => {
      //     console.log('Error');
      //   },
      // )

    return {
      scene: scene,
      camera: camera,
      renderer: renderer,
      controls: [],
      gltfLoader:gltfLoader
    };
  },

  created() {
    this.scene.add(this.camera)
    this.camera.position.z = 4

    //Controls
    this.controls= new OrbitControls(this.camera, this.renderer.domElement)
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
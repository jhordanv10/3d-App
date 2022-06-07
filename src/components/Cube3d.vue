<template>
  <div ref="canvas" class="contenedor3D" />
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
    );

    //Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    //Cube
    const geometry = new THREE.BoxBufferGeometry( 1,1,1 )
    const material = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0xee8688,
    })
    const cube = new THREE.Mesh( geometry, material);

    return {
      scene: scene,
      camera: camera,
      renderer: renderer,
      cube:cube,
      controls: [],
    };
  },

  created() {
    this.scene.add(this.camera);
    this.scene.add(this.cube);
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

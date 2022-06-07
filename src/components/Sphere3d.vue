<template>
  <div>
    <div ref="canvas" class="contenedor3D" />
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

    //Sphere
    const geometry = new THREE.SphereGeometry(0.8, 32, 16);
    const material = new THREE.MeshNormalMaterial({
      flatShading: true,
    });
    const sphere = new THREE.Mesh(geometry, material);

    return {
      scene: scene,
      camera: camera,
      renderer: renderer,
      sphere: sphere,
      controls: [],
    };
  },

  created() {
    this.scene.add(this.camera);
    this.scene.add(this.sphere);
    this.camera.position.z = 4;
    //Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
  },

  mounted() {
    this.$refs.canvas.appendChild(this.renderer.domElement);
    this.animate();
  },

  methods: {
    animate() {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
      this.controls.update();
    },
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

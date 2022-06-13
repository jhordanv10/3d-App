<template>
  <div ref="canvas" class="contenedor3D" />
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

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

    //Plane
    const geometry = new THREE.PlaneGeometry(3, 3, 15, 15);
    const material = new THREE.MeshBasicMaterial({
      color: 0xc6dce4,
      side: THREE.DoubleSide,
      wireframe: true,
      opacity: 0.9,
    });
    const plane = new THREE.Mesh(geometry, material);

    //TextureLoader
    const textureLoader = new THREE.TextureLoader();
    const matcap = textureLoader.load(
      require("../../public/textures/Matcap2.png")
    );
    //Sphere
    const geometry1 = new THREE.SphereGeometry(0.3, 32, 64);
    const material1 = new THREE.MeshMatcapMaterial({
      matcap: matcap,
    });
    const sphere = new THREE.Mesh(geometry1, material1);

    //dat GUI
    const gui = new dat.GUI();

    return {
      scene: scene,
      camera: camera,
      renderer: renderer,
      plane: plane,
      sphere: sphere,
      gui: gui,
      controls: [],
    };
  },

  created() {
    this.scene.add(this.camera);
    this.scene.add(this.plane);
    this.camera.position.z = 4;

    //Plane settings
    this.plane.rotation.x = -1.21;
    this.plane.rotation.z = -0.77;
    this.plane.position.y = -1;

    this.scene.add(this.sphere);

    //Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
  },

  mounted() {
    this.$refs.canvas.appendChild(this.renderer.domElement);
    this.animate();
  },
  destroyed() {
    this.cleanUpScene();
  },

  methods: {
    animate() {

      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
      this.controls.update();
    },
    cleanUpScene() {
      this.scene.dispose();
      this.gui.destroy();
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

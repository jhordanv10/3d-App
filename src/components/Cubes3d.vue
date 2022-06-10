<template>
  <div ref="canvas" class="contenedor3D" />
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

    //Geometry and materials
    const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial();

    //Cube 1
    const cube1 = new THREE.Mesh(geometry, material);

    //Cube2
    const cube2 = new THREE.Mesh(geometry, material);

    //Cube3
    const cube3 = new THREE.Mesh(geometry, material);

    //Cube4
    const cube4 = new THREE.Mesh(geometry, material);

    //Cube5
    const cube5 = new THREE.Mesh(geometry, material);

    //Cube6
    const cube6 = new THREE.Mesh(geometry, material);

    //Raycaster
    const raycaster = new THREE.Raycaster();
    const collitions = [cube1, cube2, cube3, cube4, cube5, cube6];
    const mouseCoors = new THREE.Vector2();

    return {
      scene: scene,
      camera: camera,
      renderer: renderer,
      cube1: cube1,
      cube2: cube2,
      cube3: cube3,
      cube4: cube4,
      cube5: cube5,
      cube6: cube6,
      controls: [],
      mouseCoors: mouseCoors,
      raycaster: raycaster,
      collitions: collitions,
    };
  },

  created() {
    this.scene.add(this.camera);

    //Cube 1
    this.scene.add(this.cube1);

    //Cube 2
    this.cube2.position.set(1, 2.5, -3);
    this.scene.add(this.cube2);

    //Cube 3
    this.cube3.position.set(-0.2, -3, -1);
    this.scene.add(this.cube3);

    //Cube 4
    this.cube4.position.set(3, -2, -4);
    this.scene.add(this.cube4);

    //Cube 5
    this.cube5.position.set(-1.2, 3, -2);
    this.scene.add(this.cube5);

    //Cube 6
    this.cube6.position.set(-2, -2, -3);
    this.scene.add(this.cube6);

    this.camera.position.z = 4;

    //Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
  },

  mounted() {
    this.$refs.canvas.appendChild(this.renderer.domElement);
    this.animate();

    window.removeEventListener("resize", this.resize)
    window.addEventListener("onMouseMove", (e) => this.onMouseMove(e));
  },
  unmounted(){
    },

  methods: {
    resize() {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
    },

    onMouseMove(event) {

      this.mouseCoors.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouseCoors.y = -(event.clientY / window.innerHeight) * 2 + 1;
    },

    animate() {
      //Raycaster Setup
      this.raycaster.setFromCamera(this.mouseCoors, this.camera);
      
      const raycasterCollitions = this.raycaster.intersectObjects(this.collitions);
      for(const original of this.collitions) {
          original.material.color.set('red')
      }

      for (const collition of raycasterCollitions ) {
        collition.object.material.color.set('green');
      }

      this.controls.update();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
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

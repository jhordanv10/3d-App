<template>
  <div
    @click="onClick"
    @mousemove="onPointer"
    ref="canvas"
    class="contenedor3D"
  >
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";

export default {
  data() {
    //Global Var
    let meshCurrent = null;
    let meshCurrentClick = null;

    //Scene
    let scene = new THREE.Scene();
    // scene.background = new THREE.Color( 0xf0f0f0 )

    //Camera
    let camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    //Light
    const DirectionalLight = new THREE.DirectionalLight(0xffffff, 1);

    //Renderer
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    //Cube 1
    const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial();
    const cube = new THREE.Mesh(geometry, material);
    cube.name = "Cube 1";

    //Cube 2
    const geometry1 = new THREE.BoxBufferGeometry(1, 1, 1);
    const material1 = new THREE.MeshBasicMaterial();
    const cube2 = new THREE.Mesh(geometry1, material1);
    cube2.name = "Cube 2";

    //Cube 3
    const geometry2 = new THREE.BoxBufferGeometry(1, 1, 1);
    const material2 = new THREE.MeshBasicMaterial();
    const cube3 = new THREE.Mesh(geometry2, material2);
    cube3.name = "Cube 3";
    

    //Raycaster
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(-100, -100);

    return {
      scene: scene,
      camera: camera,
      renderer: renderer,
      cube: cube,
      cube2: cube2,
      cube3: cube3,
      controls: [],
      DirectionalLight: DirectionalLight,
      pointer: pointer,
      raycaster: raycaster,
      meshCurrent: meshCurrent,
      meshCurrentClick: meshCurrentClick,
      gsap: gsap,
    };
  },

  created() {
    this.scene.add(this.camera);

    //Cube
    this.scene.add(this.cube);

    //Cube 2
    this.cube2.position.set(-2, 0, 0);

    this.scene.add(this.cube2);

    //Cube 3
    this.cube3.position.set(2, 0, 0);
    this.scene.add(this.cube3);

    this.camera.position.z = -4;

    //Light
    this.DirectionalLight.position.set(1, 1, 1).normalize();
    this.scene.add(this.DirectionalLight);

    //Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    this.onPointer();
  },

  mounted() {
    this.$refs.canvas.appendChild(this.renderer.domElement);
    this.animate();
  },
  methods: {
    resize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    },

    //Objects for collitions
    objectForCollitions() {
      return [this.cube, this.cube2, this.cube3];
    },

    onClick() {
      try {
        switch (this.meshCurrentClick.name) {
          case "Cube 1":
            return console.log("Cube 1 - click");
          case "Cube 2":
            return console.log("Cube 2 - click");
          case "Cube 3":
            return console.log("Cube 3 - click");
          default:
            return null;
        }
      } catch (error) {}
    },

    onPointer(event) {
      try {
        this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

        //Raycaster Setup
        this.raycaster.setFromCamera(this.pointer, this.camera);

        const collitions = this.objectForCollitions();

        const intersects = this.raycaster.intersectObjects(collitions, true);

        //Mouse onleave
        if (this.meshCurrent) {
          this.gsap.to(this.meshCurrent.material.color, {
            r: 1,
            g: 1,
            b: 1,
            overwrite: true,
            duration: 0.3,
          });
        }

        //Mouse hover and Click
        if (intersects.length) {
          this.meshCurrent = null;
          this.meshCurrent = intersects[0].object;
          this.meshCurrentClick = intersects[0].object;

          this.gsap.to(this.meshCurrent.material.color, {
            r: 1,
            g: 0,
            b: 0,
            overwrite: true,
            duration: 0.3,
          });
        } else if (this.meshCurrent) {
          this.gsap.to(this.meshCurrent.material.color, {
            r: 1,
            g: 1,
            b: 1,
            overwrite: true,
            duration: 0.5,
          });
        }
      } catch (error) {}
    },

    animate() {

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

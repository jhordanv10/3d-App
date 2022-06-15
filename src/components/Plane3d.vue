<template>
  <div>
    <div class="buttons d-flex">
      <v-btn @click="onClick('sphere')" dark class="button" color="#6f3f3f"
        >Esfera</v-btn
      >
      <v-btn @click="onClick('cube')" dark class="button" color="#f94c66"
        >Cubo</v-btn
      >
      <v-btn @click="onClick('cone')" dark class="button" color="#445477"
        >Cono</v-btn
      >
      <v-btn @click="onClick('cylinder')" dark class="button" color="#ffc54d"
        >Cilindro</v-btn
      >
      <v-btn @click="onClick('normal')" dark class="button" color="#7f9cdc"
        >Normal</v-btn
      >
    </div>
    <div ref="canvas" class="contenedor3D"></div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import { gsap } from "gsap";

export default {
  data() {
    //Scene
    const scene = new THREE.Scene();

    //Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1500
    );

    //Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    //Plane
    const geometry = new THREE.PlaneGeometry(4, 4, 10,10);
    const material = new THREE.MeshBasicMaterial({
      color: 0xc6dce4,
      side: THREE.DoubleSide,
      wireframe: true,
    });
    const plane = new THREE.Mesh(geometry, material);
    plane.name = "plane";

    //Sphere
    const geometry1 = new THREE.SphereGeometry(0.3, 32, 64);
    const material1 = new THREE.MeshStandardMaterial({
      color: 0x6f3f3f,
    });
    const sphere = new THREE.Mesh(geometry1, material1);
    sphere.name = "sphere";

    //Cube
    const geometry2 = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5);
    const material2 = new THREE.MeshStandardMaterial({
      color: 0xf94c66,
    });
    const cube = new THREE.Mesh(geometry2, material2);
    cube.name = "cube";

    //Cylinder
    const geometry3 = new THREE.CylinderGeometry(0.3, 0.3, 0.5);
    const material3 = new THREE.MeshStandardMaterial({
      color: 0xffc54d,
    });
    const cylinder = new THREE.Mesh(geometry3, material3);
    cylinder.name = "cylinder";

    //Cone
    const geometry4 = new THREE.ConeGeometry(0.5, 0.5, 3);
    const material4 = new THREE.MeshBasicMaterial({ color: 0x445477 });
    const cone = new THREE.Mesh(geometry4, material4);

    //Light
    const AmbientalLigth = new THREE.AmbientLight(0xffffff, 1);
    const DirectionalLigth = new THREE.DirectionalLight(0xffffff, 1);

    //dat GUI
    const gui = new dat.GUI();

    //gsap
    const timeline = new gsap.timeline({
      defaults: {
        duration: 1,
      },
    });

    //Config gsap
    const animations = {
      sphere: {
        camera: {
          x: 2.26,
          y: 0.72,
          z: 14.98,
        },
        zoom: 2.65,
      },
      cube: {
        camera: {
          x: -2.26,
          y: 0.72,
          z: -14.98,
        },
        zoom: 2.65,
      },
      cone: {
        camera: {
          x: -8.86,
          y: 0.67,
          z: -1.02,
        },
        zoom: 1.2,
      },
      cylinder: {
        camera: {
          x: 8.86,
          y: 0.67,
          z: -1.02,
        },
        zoom: 1.2,
      },
      normal: {
        camera: {
          x: 0,
          y: 10,
          z: -10,
        },
        zoom: 1,
      },
    };

    return {
      scene: scene,
      camera: camera,
      renderer: renderer,
      plane: plane,
      sphere: sphere,
      cube: cube,
      cone: cone,
      cylinder: cylinder,
      gui: gui,
      DirectionalLigth: DirectionalLigth,
      AmbientalLigth: AmbientalLigth,
      controls: [],
      gsap: gsap,
      timeline: timeline,
      animations: animations,
    };
  },

  created() {
    this.scene.add(this.camera);
    this.scene.add(this.plane);
    this.camera.position.set(0, 10, -10);

    //Plane
    this.plane.rotation.x = -1.5;
    this.plane.rotation.z = -0.77;
    this.plane.position.y = -1;

    this.plane.scale.x = 2;
    this.plane.scale.y = 2;

    //Sphere
    this.sphere.position.set(0, -0.3, 4.1);
    this.sphere.scale.set(3, 3, 3);
    this.scene.add(this.sphere);

    //Cube
    this.cube.position.set(0, 0, -4.1);
    this.cube.scale.set(2.5, 2.5, 2.5);
    this.scene.add(this.cube);

    //Cylinder
    this.cylinder.position.set(3.7, -0.3, 0);
    this.cylinder.scale.set(2.5, 2.5, 2.5);
    this.scene.add(this.cylinder);

    //Cone
    this.cone.position.set(-3.7, -0.3, 0);
    this.cone.scale.set(2.5, 2.5, 2.5);
    this.scene.add(this.cone);

    //Ligth
    this.scene.add(this.AmbientalLigth);

    this.DirectionalLigth.position.set(5, 5, 5);
    this.scene.add(this.DirectionalLigth);

    //Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    this.moveObject();
    this.onClick()
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
    moveObject() {
      this.timeline
        .from(this.sphere.position, {
          y: 10,
        })
        .from(
          this.cube.position,
          {
            y: 10,
          },
          "=-1.0"
        )
        .from(
          this.cylinder.position,
          {
            y: 10,
          },
          "=-1.0"
        )
        .from(
          this.cone.position,
          {
            y: 10,
          },
          "=-1.0"
        );
    },
    onClick(mesh) {
      this.timeline
        .to(this.camera.position, {
          x: this.animations[mesh].camera.x,
          y: this.animations[mesh].camera.y,
          z: this.animations[mesh].camera.z,
        })
        .to(this.camera, {
          zoom: this.animations[mesh].zoom,
          onUpdate: () => {
            this.camera.updateProjectionMatrix();
          },
        });
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
.buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #000;
  padding-top: 25px;
  padding-bottom: 5px;
  .button {
    margin-right: 3px;
    margin-left: 3px;
    margin-bottom: 8px;
  }
}
</style>

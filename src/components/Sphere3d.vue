<template>
  <div>
    <div
      @click="onClick"
      @mousemove="onPointer"
      ref="canvas"
      class="contenedor3D"
    />
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import { gsap } from "gsap";

export default {
  data() {
    //Global Var
    let meshCurrent = null;
    let meshCurrentClick = null;

    //Scene
    let scene = new THREE.Scene();

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

    //TextureLoader
    const textureLoader = new THREE.TextureLoader()
    const map = textureLoader.load(require('../../public/bricks/BaseColor.jpg'))
    const aoMap = textureLoader.load(require('../../public/bricks/Ao.jpg'))
    const roughnessMap = textureLoader.load(require('../../public/bricks/Roughness.jpg'))
    const normalMap = textureLoader.load(require('../../public/bricks/Normal.jpg'))
    const heightMap = textureLoader.load(require('../../public/bricks/Height.png'))


    //Sphere
    const geometry = new THREE.SphereGeometry(0.8, 16, 16);
    const material = new THREE.MeshNormalMaterial({
      flatShading: true,
    });
    let sphere = new THREE.Mesh(geometry, material);

    //Sphere 1
    const geometry1 = new THREE.SphereGeometry(0.8, 20, 20);
    const material1 = new THREE.MeshBasicMaterial({
      color: 0x445477,
    });
    let sphere1 = new THREE.Mesh(geometry1, material1);

    //Sphere 2
    const geometry2 = new THREE.SphereGeometry(0.8, 32, 32);
    const material2 = new THREE.MeshStandardMaterial({
      map:map,
      aoMap:aoMap,
      roughnessMap: roughnessMap,
      normalMap:normalMap,
      displacementMap:heightMap,
      displacementScale: 0.1
    });
    let sphere2 = new THREE.Mesh(geometry2, material2);

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

    //dat GUI
    const gui = new dat.GUI();

    //Folder position
    const positions = gui.addFolder("Positions");
    //Position X
    positions.add(sphere.position, "x").min(-5).max(5).step(0.5).name("Pos X");

    //Position Y
    positions.add(sphere.position, "y").min(-5).max(5).step(0.5).name("Pos Y");

    //Position Z
    positions.add(sphere.position, "z").min(-5).max(5).step(0.5).name("Pos Z");

    //Folder Options
    const options = gui.addFolder("Options");
    //Aux scale
    const sphereAux = {
      scale: 1,
      color: 0x7f9cdc,
      wireframe: false,
    };

    //Scale
    options
      .add(sphereAux, "scale", {
        Small: 1,
        Medium: 1.5,
        Big: 2,
      })
      .name("Scale")
      .onChange(() => {
        sphere.scale.set(sphereAux.scale, sphereAux.scale, sphereAux.scale);
      });

    //Color
    options.addColor(sphereAux, "color").onChange(() => {
      sphere.material.color.set(sphereAux.color);
    });

    //Wireframe
    options
      .add(sphereAux, "wireframe")
      .name("Wireframe")
      .onChange(() => {
        scene.remove(sphere);
        material = new THREE.MeshBasicMaterial({
          color: sphereAux.color,
          wireframe: !!sphereAux.wireframe,
        });
        sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
      });

    //Raycaster
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(-100, -100);

    return {
      scene: scene,
      camera: camera,
      renderer: renderer,
      sphere: sphere,
      sphere1: sphere1,
      sphere2: sphere2,
      raycaster: raycaster,
      pointer: pointer,
      controls: [],
      AmbientalLigth:AmbientalLigth,
      DirectionalLigth:DirectionalLigth,
      envMap:envMap,
      meshCurrent: meshCurrent,
      meshCurrentClick: meshCurrentClick,
      gui: gui,
      gsap: gsap,
    };
  },

  created() {
    this.scene.add(this.camera);

    //Sphere
    this.scene.add(this.sphere);

    //Sphere 1
    this.sphere1.position.set(0, 2.5, 0);
    this.scene.add(this.sphere1);

    //Sphere 2
    this.sphere2.position.set(0, -2.5, 0);
    this.scene.add(this.sphere2);

    //Ligth
    this.scene.add(this.AmbientalLigth);
    this.DirectionalLigth.position.set(5,5,5)
    this.scene.add(this.DirectionalLigth);

    this.camera.position.z = 6;
    //Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    this.onPointer();
  },

  mounted() {
    this.$refs.canvas.appendChild(this.renderer.domElement);
    this.animate();
  },

  destroyed() {
    this.cleanUpScene();
  },

  methods: {
    objectForRotation() {
      return [this.sphere, this.sphere2];
    },
    objectForWireframe() {
      return [this.sphere1];
    },
    onClick(event) {
      try {
        this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

        //Raycaster Setup
        this.raycaster.setFromCamera(this.pointer, this.camera);

        const wireframe = this.objectForWireframe();
        const intersects = this.raycaster.intersectObjects(wireframe, true);

        //Mouse onleave
        if (this.meshCurrentClick) {
          this.gsap.to(this.meshCurrentClick.material, {
            wireframe: false,
            overwrite: true,
            duration: 5,
          });
        }

        //Mouse hover and Click
        if (intersects.length) {
          this.meshCurrent = null;
          this.meshCurrent = intersects[0].object;
          this.meshCurrentClick = intersects[0].object;

          //Mouse hover and Click
          if (intersects.length) {
            this.meshCurrent = null;
            this.meshCurrentClick = intersects[0].object;

            this.gsap.from(this.meshCurrentClick.material, {
              wireframe: true,
              overwrite: true,
              duration: 5,
            });
          } else if (this.meshCurrent) {
            this.gsap.to(this.meshCurrentClick.material, {
              wireframe: false,
              overwrite: true,
              duration: 3,
            });
          }
        }
      } catch (error) {}
    },

    onPointer(event) {
      try {
        this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

        //Raycaster Setup
        this.raycaster.setFromCamera(this.pointer, this.camera);

        //Collition rotation
        const rotation = this.objectForRotation();
        const intersects = this.raycaster.intersectObjects(rotation, true);

        //Mouse onleave
        if (this.meshCurrent) {
          this.gsap.from(this.meshCurrent.rotation, {
            y: 0,
            x: 0,
            z: 0,
            overwrite: true,
            duration: 1,
          });
        }
        //Mouse hover and Click
        if (intersects.length) {
          this.meshCurrent = null;
          this.meshCurrent = intersects[0].object;

          this.gsap.from(this.meshCurrent.rotation, {
            y: 3,
            x: 3,
            z: 3,
            overwrite: true,
            duration: 1,
          });
        } else if (this.meshCurrent) {
          this.gsap.from(this.meshCurrent.rotation, {
            y: 0,
            x: 0,
            z: 0,
            overwrite: true,
            duration: 0.5,
          });
        }
      } catch (error) {}
    },
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

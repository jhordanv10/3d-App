<template>
  <div>
    <div ref="canvas" class="contenedor3D" />
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui"



export default {
  data() {
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

    //Sphere
    const geometry = new THREE.SphereGeometry(0.8, 32, 16);
    let material = new THREE.MeshBasicMaterial({
      color: 0x7f9cdc,
    });
    let sphere = new THREE.Mesh(geometry, material);

    //dat GUI
    const gui = new dat.GUI()
    
    //Folder position
    const positions = gui.addFolder('Positions')
      //Position X
      positions.add(sphere.position, 'x')
        .min(-5)
        .max(5)
        .step(0.5)
        .name('Pos X')

      //Position Y
      positions.add(sphere.position, 'y')
        .min(-5)
        .max(5)
        .step(0.5)
        .name('Pos Y')
      
      //Position Z
      positions.add(sphere.position, 'z')
        .min(-5)
        .max(5)
        .step(0.5)
        .name('Pos Z')  


    //Folder Options
    const options = gui.addFolder('Options')
      //Aux scale
      const sphereAux = {
        scale:1,
        color:0x7f9cdc,
        wireframe: false,
      }

      //Scale
      options.add(sphereAux, 'scale', {
        "Small":1,
        "Medium":1.5,
        "Big":2,
      })
        .name('Scale')
        .onChange( () => {
          sphere.scale.set(
            sphereAux.scale,
            sphereAux.scale,
            sphereAux.scale
          )
      })

      //Color
      options.addColor(sphereAux, 'color')
        .onChange( () => {
          sphere.material.color.set(sphereAux.color)
        })

      //Wireframe
      options.add(sphereAux, 'wireframe', )
      .name('Wireframe')
      .onChange ( () => {
        scene.remove(sphere)
        material = new THREE.MeshBasicMaterial({
          color: sphereAux.color,
          wireframe: !!sphereAux.wireframe
        })
        sphere = new THREE.Mesh(geometry, material)
        scene.add(sphere)
      })


    return {
      scene: scene,
      camera: camera,
      renderer: renderer,
      sphere: sphere,
      controls: [],
      gui:gui,
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

  destroyed() {
    this.cleanUpScene()
  },

  methods: {
    animate() {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
      this.controls.update();
    },
    cleanUpScene()  {
      this.scene.dispose()
      this.gui.destroy()
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

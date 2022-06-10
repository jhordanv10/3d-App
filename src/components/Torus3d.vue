<template>
  <div ref="canvas" class="contenedor3D" />
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import * as dat from "dat.gui"

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

    //Torus
    let geometry = new THREE.TorusGeometry( 1, 0.4, 8, 10 );
    const material = new THREE.MeshNormalMaterial( {
      wireframe: true,
    });
    let torus = new THREE.Mesh( geometry, material );

    //dat GUI
    const gui = new dat.GUI()

    //Auxiliar Torus
    const torusAux = {
      scaleX:1,
      scaleY:1,
      scaleZ:1,
      subdivitions: 2,
    }

    //Folder Torus
    const torusFolder = gui.addFolder("Torus Tweaks")

      //Scale X
      torusFolder.add(torusAux, 'scaleX')
      .min(1)
      .max(3)
      .name("Scale X")
      .onChange( () => {
        torus.scale.x = torusAux.scaleX
      }) 

      //Scale Y
      torusFolder.add(torusAux, 'scaleY')
      .min(1)
      .max(3)
      .name("Scale Y")
      .onChange( () => {
        torus.scale.y = torusAux.scaleY
      }) 

      //Scale Z
      torusFolder.add(torusAux, 'scaleZ')
      .min(-1)
      .max(3)
      .name("Scale Z")
      .onChange( () => {
        torus.scale.z = torusAux.scaleZ
      }) 

      //Subduvitions
      torusFolder.add(torusAux, 'subdivitions')
      .min(2)
      .max(100)
      .name('Subdivitions')
      .step(2)
      .onChange( () => {
        scene.remove(torus)
        geometry = new THREE.TorusGeometry(
          1, 0.4, 8, torusAux.subdivitions
        )
        torus = new THREE.Mesh(geometry, material)
        scene.add(torus)
      })


    return {
      scene: scene,
      camera: camera,
      renderer: renderer,
      torus:torus,
      controls: [],
      gui:gui,
    };
  },

  created() {
    this.scene.add(this.camera);
    this.scene.add(this.torus);
    this.camera.position.z = 4
    //Controls
    this.controls= new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
  },

  mounted() {
    this.$refs.canvas.appendChild(this.renderer.domElement);
    this.animate()
  },
  destroyed() {
    this.cleanUpScene()
  },

  methods: {
        animate() {
          this.renderer.render(this.scene, this.camera)
          requestAnimationFrame(this.animate)
          this.controls.update()
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

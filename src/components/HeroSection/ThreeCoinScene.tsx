import { Component, createSignal, createEffect, onCleanup } from 'solid-js';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export const ThreeCoinScene: Component = () => {
    let container: HTMLDivElement | undefined;
    const [isLoaded, setIsLoaded] = createSignal<boolean>(false);
    let coin: THREE.Mesh | undefined;
    let slideStart = 0;
  
    createEffect(() => {
      if (!container) return;
  
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(600, 400);
      if (container) container.appendChild(renderer.domElement);
  
      // Set scene background to black
      renderer.setClearColor(0x000000, 1); // Solid black
  
      // Lighting
      const ambientLight = new THREE.AmbientLight(0x404040, 1);
      const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1); // White light for silver
      directionalLight.position.set(5, 3, 5);
      scene.add(ambientLight, directionalLight);
  
      const loader = new GLTFLoader();
      loader.load('/assets/3d/gravity_coin.gltf', (gltf: GLTF) => {
        const model = gltf.scene;
        model.traverse((child: THREE.Object3D) => {
          if ((child as any).isMesh) {
            const box = new THREE.Box3().setFromObject(child);
            console.log('Mesh bounds:', box.min, box.max);
            const material = new THREE.MeshStandardMaterial({
              color: 0xE0E0E0, // Brighter silver
              emissive: 0x000000,
              emissiveIntensity: 0,
              metalness: 0.9, // Higher metallicity
              roughness: 0.1, // Smoother surface
            });
            (child as THREE.Mesh).material = material;
            if (child.name === 'coin') {
              coin = child as THREE.Mesh;
              coin.position.x = 10; // Start off-screen right
            }
          }
        });
        model.scale.set(0.5, 0.5, 0.5);
        model.position.set(0, 0, 0);
        scene.add(model);
        setIsLoaded(true);
      }, undefined, (error: unknown) => console.error('GLTF load error:', error));
  
      camera.position.z = 2.5;
      
      const animate = () => {
        requestAnimationFrame(animate);
        const now = performance.now();
        if (isLoaded()) {
          scene.rotation.y += 0.015;
          if (coin) {
            // Delay coin slide until after 1s scene animation
            if (now - slideStart > 1000 && coin.position.x > 0) {
              coin.position.x -= 0.1;
              if (coin.position.x < 0) coin.position.x = 0; // Stop at center
            }
          }
        }
        renderer.render(scene, camera);
      };
      animate();
  
      onCleanup(() => {
        if (renderer.domElement && container) container.removeChild(renderer.domElement);
      });
    });
  
    return (
      <div
        ref={container as any}
        style={{
          width: '100%',
          height: '100%',
          'border-radius': '12px',
          animation: 'slideIn 1s ease-out forwards',
        }}
        onAnimationStart={() => (slideStart = performance.now())} // Start timer on scene slide
      />
    );
  };
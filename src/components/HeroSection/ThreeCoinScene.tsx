import { Component, createSignal, createEffect, onCleanup } from 'solid-js';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';


export const ThreeCoinScene: Component = () => {
  let container: HTMLDivElement | undefined;
  const [isLoaded, setIsLoaded] = createSignal<boolean>(false);
  const coinGroups: THREE.Group[] = []; // Store coin groups for animation
  const slideStates = [10, 10, 10]; // Track slide position for each coin
  let startTime = performance.now();
  
  createEffect(() => {
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(600, 600);
    if (container) container.appendChild(renderer.domElement);

    renderer.setClearColor(0x000000, 1);

    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(ambientLight, directionalLight);

    const loader = new GLTFLoader();
    loader.load('/assets/3d/token.glb', (gltf: GLTF) => {
      const model = gltf.scene;
      model.traverse((child: THREE.Object3D) => {
        if ((child as any).isMesh) {
          const material = new THREE.MeshStandardMaterial({
            color: 0xFFD700,
            emissive: 0xFFD700,
            emissiveIntensity: 0,
            metalness: 0.9,
            roughness: 0.1,
          });
          (child as THREE.Mesh).material = material;
        }
      });

      for (let i = 0; i < 6; i++) {
        const coinGroup = new THREE.Group(); // Group for each coin
        const coinInstance = model.clone();
        coinInstance.scale.set(0.9, 0.9, 0.9);
        coinGroup.add(coinInstance);
        coinGroup.position.set(1 - i * 2, .01, 0.4 - i * 2); // Spread horizontally
        scene.add(coinGroup);
        coinGroups.push(coinGroup);
      }
      setIsLoaded(true);
    }, undefined, (error: unknown) => console.error('GLTF load error:', error));

    camera.position.z = 3;

   
    const animate = () => {
      requestAnimationFrame(animate);
      if (isLoaded()) {
        const now = performance.now();
        coinGroups.forEach((group, index) => {
          // Spin animation (continuous)
          group.rotation.y += 0.005 * (index + 1);
          // Slide animation (stops at x = 0)
          if (now - startTime > 1000 && slideStates[index] > 0) {
            slideStates[index] -= 0.1;
            if (slideStates[index] < 0) slideStates[index] = 0;
            group.position.x = 2 - index * 2 + slideStates[index];
          }
        });
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
      onAnimationStart={() => (startTime = performance.now())}
    />
  );
};
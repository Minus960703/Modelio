"use client";  // Next.js 클라이언트 컴포넌트 지시어

import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';

// 로딩 상태 표시기
const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <span>{progress.toFixed(2)}% loaded</span>
    </Html>
  );
};

interface ModelProps {
  modelPath: string;
  onSelect: (mesh: THREE.Mesh) => void;
  selectedMesh: THREE.Mesh | null;
}

const Model = ({ modelPath, onSelect, selectedMesh }: ModelProps) => {
  const { scene, camera } = useThree(); // Canvas 내부에서만 사용 가능
  const { gl } = useThree();
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  
  const { scene: loadedScene } = useGLTF(modelPath);
  const meshRef = useRef<THREE.Group>();

  // 클릭 이벤트 핸들링
  const handlePointerDown = (event: THREE.MouseEvent) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // 레이캐스터 설정
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    if (intersects.length > 0) {
      const selected = intersects[0].object;
      if (selected instanceof THREE.Mesh) {
        onSelect(selected);
      }
    }
  };

  // 선택된 메쉬의 색상 변경
  useFrame(() => {
    if (selectedMesh) {
      selectedMesh.material.color.setHex(0xff0000);
    }
  });

  return (
    <primitive
      ref={meshRef}
      object={loadedScene}
      onPointerDown={handlePointerDown} // 클릭 이벤트 추가
    />
  );
};

const ModelViewer = () => {
  const [selectedMesh, setSelectedMesh] = useState<THREE.Mesh | null>(null);

  const handleSelect = (mesh: THREE.Mesh) => {
    console.log('Selected mesh:', mesh);
    setSelectedMesh(mesh);
  };

  return (
    <Canvas style={{ height: '500px', width: '100%' }}>
      {/* 기본 조명 */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Suspense로 3D 모델 로딩 */}
      <Suspense fallback={<Loader />}>
        <Model modelPath="/assets/threeD/jinu.glb" onSelect={handleSelect} selectedMesh={selectedMesh} />
      </Suspense>

      {/* 카메라 제어를 위한 OrbitControls */}
      <OrbitControls />
    </Canvas>
  );
};

export { ModelViewer };
// src/components/Model.jsx
import React from 'react';
import { useGLTF } from '@react-three/drei';

function Model() {
  // useGLTF vai carregar o modelo da pasta public
  const { scene } = useGLTF('/models/duck.glb');
  return <primitive object={scene} scale={2} />;
}

export default Model;

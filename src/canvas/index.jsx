import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";

import Shirt from "./Shirt";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";

const CanvasModel = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModel;

/* @react-three/fiber es una librería de React que permite trabajar con gráficos 3D utilizando Three.js. Proporciona un conjunto de componentes y utilidades que facilitan la creación y manipulación de escenas, objetos 3D, luces, cámaras y animaciones en un entorno web.
Canvas es uno de los componentes principales proporcionados por @react-three/fiber. Se utiliza como contenedor principal para renderizar la escena 3D y gestionar la lógica y el ciclo de vida de Three.js. Puedes pensar en Canvas como el equivalente al div en HTML para renderizar una escena 3D en un contexto React. */

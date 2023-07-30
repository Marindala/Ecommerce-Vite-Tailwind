import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";

import state from "../store";

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/shirt_baked.glb");

  const logoTexture = useTexture(snap.logoDecal);
  //console.log(logoTexture);
  const fullTexture = useTexture(snap.fullDecal);

  useFrame((state, delta) =>
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
  );

  const stateString = JSON.stringify(snap);
  //console.log(stateString)

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            anisotropy={16} /* resolví: cambié la propiedad */
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;

/* Tienes razón, en el código que proporcionaste se está creando la remera en 3D utilizando la librería `@react-three/fiber` y `@react-three/drei`.

Vamos a analizar cómo se construye la remera en 3D:

1. `useGLTF("/shirt_baked.glb")`:
En esta línea, estás utilizando el gancho `useGLTF` de `@react-three/drei` para cargar un archivo GLTF (`shirt_baked.glb`). El archivo GLTF contiene la geometría, materiales y texturas de la remera en 3D. Este archivo se carga y se descompone en los objetos `nodes` y `materials`.

2. `useTexture(snap.logoDecal)` y `useTexture(snap.fullDecal)`:
Aquí estás utilizando el gancho `useTexture` de `@react-three/drei` para cargar las texturas de la remera. Las rutas de las texturas provienen del estado `snap` almacenado en `valtio` y son `snap.logoDecal` y `snap.fullDecal`. Esto significa que las texturas de la remera se obtienen desde el estado y no se cargan como assets externos.

3. `<mesh>`:
El componente `<mesh>` representa la geometría de la remera. Se utiliza la geometría `nodes.T_Shirt_male.geometry` obtenida del archivo GLTF cargado previamente. La propiedad `material` se establece en `materials.lambert1`, lo que indica que se utiliza el material "lambert1" para la remera.

4. `<Decal>`:
Dentro del componente `<mesh>` se utilizan dos componentes `<Decal>` de `@react-three/drei`. Estos componentes se utilizan para aplicar las texturas cargadas (`logoTexture` y `fullTexture`) en posiciones específicas de la geometría de la remera. Los detalles de cómo se aplican las texturas concretamente dependen de las propiedades `position`, `rotation`, y `scale` que se establecen para cada `<Decal>`. Esto permitirá añadir detalles como un logo o una textura adicional a la remera en 3D.

En resumen, la remera en 3D se construye utilizando la geometría, materiales y texturas cargadas desde el archivo GLTF (`shirt_baked.glb`). Las texturas se obtienen del estado `snap` almacenado en `valtio`, lo que significa que las rutas de las texturas están definidas directamente en el archivo `../store`. Los detalles adicionales, como el logo y otra textura, se aplican a la remera utilizando el componente `<Decal>`.
 */


/* En este fragmento de código, estás importando varias librerías y utilidades que te permitirán trabajar con gráficos 3D en una aplicación React utilizando las librerías `@react-three/fiber` y `@react-three/drei`. 

1. `import { easing } from "maath";`:
En esta línea, estás importando algo llamado `easing` desde el módulo "maath". La importación de `easing` sugiere que esta librería probablemente proporciona funciones o métodos para realizar interpolación o transiciones suaves en animaciones. El código que estás utilizando más adelante en el `useFrame` sugiere que `easing.dampC` se utiliza para suavizar la transición del color del material de la camisa.

2. `import { useSnapshot } from "valtio";`:
`valtio` es una librería de estado mínima y moderna para React que proporciona una forma sencilla de manejar el estado de tu aplicación. `useSnapshot` es un gancho (hook) que se utiliza para suscribirse a los cambios en el estado y volver a renderizar el componente cuando el estado cambia. Es útil cuando trabajas con estados complejos y deseas una gestión de estado más eficiente.

3. `import { useFrame } from "@react-three/fiber";`:
`@react-three/fiber` es una librería que te permite trabajar con gráficos 3D en React utilizando Three.js. `useFrame` es un gancho que te permite ejecutar una función en cada cuadro de animación (frame) del renderizado de la escena. Es útil para actualizar la posición, rotación o cualquier otra propiedad de los objetos 3D de manera dinámica en función del tiempo.

4. `import { Decal, useGLTF, useTexture } from "@react-three/drei";`:
`@react-three/drei` es otra librería que extiende `@react-three/fiber` y proporciona una serie de componentes y utilidades adicionales para tareas comunes en gráficos 3D. En esta línea, estás importando tres de esas utilidades:

- `Decal`: `Decal` es un componente de Three.js que se utiliza para aplicar texturas en superficies existentes sin modificar la geometría original. Es útil para agregar logotipos, etiquetas o detalles adicionales a modelos 3D de manera flexible.

- `useGLTF`: `useGLTF` es un gancho que se utiliza para cargar archivos GLTF (GL Transmission Format) que contienen modelos 3D en tu escena. Facilita el proceso de carga y permite acceder a los nodos, materiales y geometrías del modelo para su manipulación.

- `useTexture`: `useTexture` es otro gancho que se utiliza para cargar y gestionar texturas en Three.js. Te permite cargar imágenes y aplicarlas como texturas en tus materiales de forma eficiente.

En resumen, las importaciones que mencionaste son esenciales para trabajar con gráficos 3D en una aplicación React utilizando las librerías `@react-three/fiber` y `@react-three/drei`. Estas librerías proporcionan herramientas poderosas para crear y animar escenas 3D de manera sencilla y eficiente. */

/* Diseñar la remera femenina en 3D: Utiliza un software de modelado 3D, como Blender o Maya, para crear el modelo 3D de la remera femenina. Asegúrate de que el modelo esté texturizado y configurado con los materiales adecuados para el diseño que desees.

Exportar el modelo a formato GLB: Una vez que hayas terminado el diseño de la remera femenina, exporta el modelo a formato GLB. La exportación a GLB debe incluir tanto la geometría como los materiales del modelo.

Subir el archivo GLB a la carpeta "public": Una vez que tengas el archivo GLB de la remera femenina, colócalo en la carpeta "public" de tu proyecto React. Puedes hacer esto manualmente o utilizando un administrador de archivos en tu entorno de desarrollo.

Modificar el componente "Shirt": Con el nuevo archivo GLB en la carpeta "public", puedes modificar el componente Shirt para cargar el nuevo archivo GLB en lugar del anterior. Asegúrate de ajustar la ruta en la función useGLTF para que apunte al nuevo archivo GLB de la remera femenina. */

// DEVSLAYER world assembly. Lighting budget: ambient + hemisphere +
// 1 directional + 3 short-range lantern points. No shadow maps — structures
// carry baked blob shadows. Bloom + vignette only on high-quality devices.

import Terrain from './Terrain';
import Nature from './Nature';
import Structures from './Structures';
import Beacons from './Beacons';
import Collectibles from './Collectibles';
import Effects from './Effects';
import CameraDirector from './CameraDirector';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { useHighQuality } from '../hooks/device';

const World = ({ effects }: { effects: boolean }) => (
  <>
    <color attach="background" args={['#1C2942']} />
    <fog attach="fog" args={['#1C2942', 75, 190]} />

    <ambientLight intensity={0.55} />
    <hemisphereLight args={['#DCE5EB', '#284B46', 0.5]} />
    <directionalLight position={[30, 40, 20]} intensity={1.1} color="#FFF2D9" />

    <pointLight position={[0, 4, 23]} intensity={60} distance={22} color="#E6B566" decay={2} />
    <pointLight position={[27, 4, 6]} intensity={50} distance={20} color="#E6B566" decay={2} />
    <pointLight position={[0, 14, -39]} intensity={80} distance={26} color="#F4D47C" decay={2} />

    <CameraDirector />
    <Terrain />
    <Nature />
    <Structures />
    <Beacons />
    <Collectibles />
    <Effects />
    {effects && <WorldGrade />}
  </>
);

// Post-processing lives behind its own component so low-end devices skip
// the runtime cost entirely (imports stay in the lazy scene chunk either way).
const WorldGrade = () => (
  <EffectComposer multisampling={0}>
    <Bloom mipmapBlur intensity={0.55} luminanceThreshold={0.62} luminanceSmoothing={0.2} />
    <Vignette darkness={0.42} offset={0.28} />
  </EffectComposer>
);

export const WorldWithQuality = () => {
  const hq = useHighQuality();
  return <World effects={hq} />;
};

export default World;

// Full world assembly: environment, connections, the six islands,
// cinematic camera, and pointer interaction. Post-processing (bloom +
// vignette) loads only on high-quality devices to protect mobile GPUs.

import { Suspense } from 'react';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import WorldEnvironment from './WorldEnvironment';
import IslandConnections from './IslandConnections';
import CameraController from './CameraController';
import InteractionManager from './InteractionManager';
import SpotFollow from './SpotFollow';
import ArrivalSparkles from './ArrivalSparkles';
import Lanterns from './Lanterns';
import HomeIsland from '../islands/HomeIsland';
import ProjectsIsland from '../islands/ProjectsIsland';
import SkillsIsland from '../islands/SkillsIsland';
import ExperienceIsland from '../islands/ExperienceIsland';
import JourneyIsland from '../islands/JourneyIsland';
import ContactIsland from '../islands/ContactIsland';
import { useHighQuality, useReducedMotion } from '../hooks/device';

const WorldGrade = () => (
  <EffectComposer multisampling={0}>
    <Bloom mipmapBlur intensity={0.5} luminanceThreshold={0.6} luminanceSmoothing={0.25} />
    <Vignette darkness={0.45} offset={0.25} />
  </EffectComposer>
);

const World = () => {
  const hq = useHighQuality();
  const reduced = useReducedMotion();
  return (
    <>
      <WorldEnvironment still={reduced} />
      <SpotFollow />
      <ArrivalSparkles still={reduced} />
      <Lanterns still={reduced} />
      <Suspense fallback={null}>
        <IslandConnections still={reduced} />
        <HomeIsland />
        <ProjectsIsland />
        <SkillsIsland />
        <ExperienceIsland />
        <JourneyIsland />
        <ContactIsland />
      </Suspense>
      <CameraController />
      <InteractionManager />
      {hq && !reduced && <WorldGrade />}
    </>
  );
};

export default World;

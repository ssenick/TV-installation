import './styles/index.scss';

import { useEffect, useState } from 'react';

import { classNames } from '@/helpers/classNames/classNames';
import { fixHeight } from '@/helpers/func/fixHeight';
import { useMediaQueryValues } from '@/hooks/useMediaQueryValues';
import { ScreenSelector } from '@/components/ScreenSelector/ScreenSelector.tsx';
import { MountSelector } from '@/components/MountSelector/MountSelector.tsx';
import { DimensionsInput } from '@/components/DimensionsInput/DimensionsInput.tsx';
import { NicheDimensions } from '@/components/NicheDimensions/NicheDimensions.tsx';

interface Config {
   screenModel: string;
   mountType: string;
   screenWidth: number;
   screenHeight: number;
   floorDistance: number;
   nicheDepthVar: number;
}

function App() {
   const { isMobile } = useMediaQueryValues();
   const [config, setConfig] = useState<Config>({
      screenModel: '',
      mountType: '',
      screenWidth: 48, // Примерная ширина экрана по умолчанию
      screenHeight: 28, // Примерная высота экрана по умолчанию
      floorDistance: 50, // Расстояние от пола
      nicheDepthVar: 0.5, // Зазор по умолчанию
   });

   // Функция обновления состояния
   const handleUpdateConfig = (key: keyof Config, value: string | number) => {
      setConfig((prev) => ({
         ...prev,
         [key]: value,
      }));
   };

   useEffect(() => {
      if (isMobile) {
         fixHeight();
      }
   }, [isMobile]);

   return (
      <div className={classNames('app', { mobile: isMobile }, [])}>
         <h1>LED Screen Configurator</h1>

         {/* Step 1: Select Screen */}
         <div>
            <h2>Step 1: Select Screen</h2>
            <ScreenSelector onChange={(value) => handleUpdateConfig('screenModel', value)} />
         </div>

         {/* Step 2: Select Mount Type */}
         <div>
            <h2>Step 2: Select Mount Type</h2>
            <MountSelector onChange={(value) => handleUpdateConfig('mountType', value)} />
         </div>

         {/* Step 3: Adjust Dimensions */}
         <div>
            <h2>Step 3: Adjust Dimensions</h2>
            <DimensionsInput
               width={config.screenWidth}
               height={config.screenHeight}
               floorDistance={config.floorDistance}
               onChange={(key, value) => handleUpdateConfig(key, value)}
            />
         </div>

         {/* Step 4: Niche Dimensions */}
         <div>
            <h2>Step 4: Niche Dimensions</h2>
            <NicheDimensions
               selectedScreen={config.screenModel}
               defaultDepthVar={config.nicheDepthVar}
               onDepthChange={(value) => handleUpdateConfig('nicheDepthVar', value)}
            />
         </div>

         {/* Configuration Summary */}
         <div>
            <h2>Configuration Summary</h2>
            <p>Screen Model: {config.screenModel || 'Not selected'}</p>
            <p>Mount Type: {config.mountType || 'Not selected'}</p>
            <p>Width: {config.screenWidth}"</p>
            <p>Height: {config.screenHeight}"</p>
            <p>Floor Distance: {config.floorDistance}"</p>
            <p>Niche Depth Var: {config.nicheDepthVar}"</p>
         </div>
      </div>
   );
}

export default App;

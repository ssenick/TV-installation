import { memo, useEffect, useState } from 'react';
import { classNames } from '@/helpers/classNames/classNames';
import cls from './DimensionsDisplay.module.scss';
import { parseCSV } from '@/helpers/func/csvParser.ts';

interface DimensionsDisplayProps {
   className?: string;
   selectedScreen: string; // Выбранная модель экрана
}

interface ScreenData {
   [key: string]: string;
}

const DimensionsDisplay = memo((props: DimensionsDisplayProps) => {
   const { className, selectedScreen } = props;
   const [screenData, setScreenData] = useState<ScreenData | null>(null);

   useEffect(() => {
      const loadScreenData = async () => {
         try {
            const data = await parseCSV('/data/ScreenMFR.csv');
            const screen = data.find((item) => item['Screen MFR'] === selectedScreen);
            setScreenData(screen || null); // Сохраняем данные для выбранного экрана
         } catch (error) {
            console.error('Error loading CSV:', error);
         }
      };

      if (selectedScreen) {
         loadScreenData();
      }
   }, [selectedScreen]);

   return (
      <div className={classNames(cls.DimensionsDisplay, {}, [className])}>
         {screenData ? (
            <>
               <div>
                  <strong>Width:</strong> {screenData['Width'] || 'N/A'}"
               </div>
               <div>
                  <strong>Height:</strong> {screenData['Height'] || 'N/A'}"
               </div>
               <div>
                  <strong>Depth:</strong> {screenData['Depth'] || 'N/A'}"
               </div>
            </>
         ) : (
            <p>Please select a screen to see its dimensions.</p>
         )}
      </div>
   );
});

DimensionsDisplay.displayName = 'DimensionsDisplay';
export { DimensionsDisplay };

import { memo, useEffect, useState } from 'react';
import { classNames } from '@/helpers/classNames/classNames';
import cls from './NicheDimensions.module.scss';
import { parseCSV } from '@/helpers/func/csvParser.ts';

interface NicheDimensionsProps {
   className?: string;
   selectedScreen: string; // Выбранная модель экрана
   defaultDepthVar: number; // Зазор ниши по умолчанию
   onDepthChange: (value: number) => void; // Функция для обновления зазора
}

interface ScreenData {
   Width: string;
   Height: string;
   Depth: string;
}

const NicheDimensions = memo((props: NicheDimensionsProps) => {
   const { className, selectedScreen, defaultDepthVar, onDepthChange } = props;

   const [screenData, setScreenData] = useState<ScreenData | null>(null);
   const [depthVar, setDepthVar] = useState<string>(''); // Используем строку для значения
   const [calculatedDimensions, setCalculatedDimensions] = useState({
      width: '',
      height: '',
      depth: '',
   });

   useEffect(() => {
      const loadScreenData = async () => {
         try {
            const data = await parseCSV('/data/ScreenMFR.csv');
            const screen = data.find((item) => item['Screen MFR'] === selectedScreen);
            if (screen) {
               const screenWidth = parseFloat(screen['Width'] || '0');
               const screenHeight = parseFloat(screen['Height'] || '0');
               const screenDepth = parseFloat(screen['Depth'] || '0');

               setScreenData({
                  Width: screen['Width'],
                  Height: screen['Height'],
                  Depth: screen['Depth'],
               });

               setCalculatedDimensions({
                  width: screenWidth ? (screenWidth + 2).toString() : '', // Преобразуем в строку
                  height: screenHeight ? (screenHeight + 2).toString() : '', // Преобразуем в строку
                  depth: screenDepth ? (screenDepth + defaultDepthVar).toString() : '', // Преобразуем в строку
               });
            }
         } catch (error) {
            console.error('Error loading CSV:', error);
         }
      };

      if (selectedScreen) {
         loadScreenData();
      }
   }, [selectedScreen, defaultDepthVar]);

   const handleDepthVarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (value === '' || !isNaN(Number(value))) {
         setDepthVar(value); // Сохраняем строку, даже если пусто
         onDepthChange(value ? parseFloat(value) : 0); // Если пусто, передаем 0
      }
   };

   return (
      <div className={classNames(cls.NicheDimensions, {}, [className])}>
         {screenData ? (
            <>
               <div>
                  <strong>Width:</strong> {calculatedDimensions.width || 'N/A'}"
               </div>
               <div>
                  <strong>Height:</strong> {calculatedDimensions.height || 'N/A'}"
               </div>
               <div>
                  <strong>Depth:</strong> {calculatedDimensions.depth || 'N/A'}"
               </div>
               <div>
                  <label htmlFor="depthVar">
                     <strong>Niche Depth Var:</strong>
                  </label>
                  <input
                     id="depthVar"
                     type="number"
                     value={depthVar} // Теперь это строка, и поле остается пустым при удалении
                     onChange={handleDepthVarChange}
                     step={0.1}
                  />
                  <span> inches</span>
               </div>
            </>
         ) : (
            <p>Please select a screen to see niche dimensions.</p>
         )}
      </div>
   );
});

NicheDimensions.displayName = 'NicheDimensions';
export { NicheDimensions };

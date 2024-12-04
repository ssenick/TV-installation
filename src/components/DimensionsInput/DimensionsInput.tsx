import { memo } from 'react';
import { classNames } from '@/helpers/classNames/classNames';
import cls from './DimensionsInput.module.scss';

interface DimensionsInputProps {
   className?: string;
   width: number;
   height: number;
   floorDistance: number;
   onChange: (key: 'floorDistance', value: number) => void;
}

const DimensionsInput = memo((props: DimensionsInputProps) => {
   const { className, width, height, floorDistance, onChange } = props;

   // Преобразуем в строку или оставляем пустым, если NaN
   const safeWidth = isNaN(width) ? '' : width; // Если width не число, оставляем пустое значение
   const safeHeight = isNaN(height) ? '' : height; // То же для height
   const safeFloorDistance = isNaN(floorDistance) ? '' : floorDistance; // То же для floorDistance

   return (
      <div className={classNames(cls.DimensionsInput, {}, [className])}>
         <div>
            <label htmlFor="width">Width (in inches):</label>
            <div>{safeWidth ? `${safeWidth}"` : ''}</div> {/* Показываем только значение, если оно задано */}
         </div>
         <div>
            <label htmlFor="height">Height (in inches):</label>
            <div>{safeHeight ? `${safeHeight}"` : ''}</div>{' '}
            {/* Показываем только значение, если оно задано */}
         </div>
         <div>
            <label htmlFor="floorDistance">Floor Distance (in inches):</label>
            <input
               id="floorDistance"
               type="number"
               value={safeFloorDistance || ''} // Пусть поле будет пустым, если значение не задано
               onChange={(e) => onChange('floorDistance', parseFloat(e.target.value))}
            />
         </div>
      </div>
   );
});

DimensionsInput.displayName = 'DimensionsInput';
export { DimensionsInput };

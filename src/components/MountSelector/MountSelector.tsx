import { memo } from 'react';
import { classNames } from '@/helpers/classNames/classNames';
import cls from './MountSelector.module.scss';

interface MountSelectorProps {
   className?: string;
   onChange: (value: string) => void;
}

const MountSelector = memo((props: MountSelectorProps) => {
   const { className, onChange } = props;

   // Опции крепления
   const mountOptions = ['Wall Mount', 'Ceiling Mount', 'Stand'];

   return (
      <select
         className={classNames(cls.MountSelector, {}, [className])}
         onChange={(e) => onChange(e.target.value)}
      >
         <option value="">Select Mount Type</option>
         {mountOptions.map((option, index) => (
            <option key={index} value={option}>
               {option}
            </option>
         ))}
      </select>
   );
});

MountSelector.displayName = 'MountSelector';
export { MountSelector };

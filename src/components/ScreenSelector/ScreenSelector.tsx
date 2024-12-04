import {memo, useEffect, useState} from 'react';
import { classNames } from '@/helpers/classNames/classNames';
import cls from './ScreenSelector.module.scss';
import {parseCSV} from "@/helpers/func/csvParser.ts";

interface ScreenSelectorProps {
   className?: string;
   onChange: (value: string) => void;
}

const ScreenSelector = memo((props: ScreenSelectorProps) => {
   const { className, onChange } = props;
    const [screens, setScreens] = useState<string[]>([]);

    useEffect(() => {
        const loadScreens = async () => {
            try {
                const data = await parseCSV('/data/ScreenMFR.csv');
                const models = data.map((item) => item['Screen MFR']).filter((model) => !!model);
                setScreens(models);
            } catch (error) {
                console.error('Error loading CSV:', error);
            }
        };

        loadScreens();
    }, []);



   return <select  className={classNames(cls.ScreenSelector, {}, [className])} onChange={(e) => onChange(e.target.value)}>
       <option value="">Select a screen</option>
       {screens.map((screen, index) => (
           <option key={index} value={screen}>
               {screen}
           </option>
       ))}
   </select>;
});

ScreenSelector.displayName = 'ScreenSelector';
export { ScreenSelector };

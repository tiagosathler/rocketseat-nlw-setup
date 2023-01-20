import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';

interface Props extends Checkbox.CheckboxProps {
  item?: string;
  rootStyle: string;
  itemStyle: string;
}

export default function CheckboxCustom({ item, rootStyle, itemStyle, ...rest }: Props) {
  return (
    <Checkbox.Root className={rootStyle} {...rest}>
      <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
        <Checkbox.Indicator>
          <Check size={20} className="text-white" />
        </Checkbox.Indicator>
      </div>

      <span className={itemStyle}>{item}</span>
    </Checkbox.Root>
  );
}

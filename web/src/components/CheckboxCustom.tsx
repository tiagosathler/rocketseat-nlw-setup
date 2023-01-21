import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';

interface Props extends Checkbox.CheckboxProps {
  item?: string;
  itemStyle: string;
}

export default function CheckboxCustom({ item, itemStyle, ...rest }: Props) {
  return (
    <Checkbox.Root
      className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
      {...rest}
    >
      <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
        <Checkbox.Indicator>
          <Check size={20} className="text-white" />
        </Checkbox.Indicator>
      </div>

      <span className={itemStyle}>{item}</span>
    </Checkbox.Root>
  );
}

interface WeekDayLabelInterface {
  label: string;
}

export default function WeekDayLabel(props: WeekDayLabelInterface) {
  const { label } = props;
  return (
    <div className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center">
      {label}
    </div>
  );
}

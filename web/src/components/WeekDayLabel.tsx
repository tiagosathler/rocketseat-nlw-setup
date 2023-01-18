interface WeekDayLabelInterface {
  label: string;
  key: string;
}

export default function WeekDayLabel(props: WeekDayLabelInterface) {
  const { key, label } = props;
  return (
    <div
      key={key}
      className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center"
    >
      {label}
    </div>
  );
}

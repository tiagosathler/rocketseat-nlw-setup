interface HabitDayProps {
  completed: number;
}

export default function HabitDay(props: HabitDayProps) {
  const { completed } = props;
  return (
    <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg">
      {completed}
    </div>
  );
}

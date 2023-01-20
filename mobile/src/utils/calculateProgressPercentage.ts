export default function calculateProgressPercentage(amount: number, completed: number): number {
  return amount !== 0 ? Math.round(100 * (completed / amount)) : 0;
}

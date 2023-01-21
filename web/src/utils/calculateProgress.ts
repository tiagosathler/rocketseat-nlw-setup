export default function calculateProgress(completed = 0, amount = 0): number {
  return amount !== 0 ? Math.round((100 * completed) / amount) : 0;
}

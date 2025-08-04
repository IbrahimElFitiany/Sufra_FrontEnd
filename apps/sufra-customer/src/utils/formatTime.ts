export function formatTimeRange(start: string, end: string): string {
  const to12Hour = (timeStr: string) => {
    const [hour, minute] = timeStr.split(':');
    const date = new Date();
    date.setHours(+hour);
    date.setMinutes(+minute);
    return date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return `${to12Hour(start)} - ${to12Hour(end)}`;
}

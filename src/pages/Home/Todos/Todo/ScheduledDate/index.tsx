type Props = {
	scheduledDate?: string | Date | null;
};

export default function ScheduledDate({ scheduledDate }: Props) {
	if (!scheduledDate) return null;

	let d: Date | null = null;
	if (typeof scheduledDate === "string") {
		d = new Date(scheduledDate);
	} else {
		d = new Date((scheduledDate as Date).valueOf());
	}
  console.log(d);
	if (!d || isNaN(d.getTime())) return null;

	// decide label for recent dates
	const today = new Date();
	const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
	const scheduledMidnight = new Date(d.getFullYear(), d.getMonth(), d.getDate());
	const diffDays = Math.round((scheduledMidnight.getTime() - todayMidnight.getTime()) / (24 * 60 * 60 * 1000));

	let label = "";
	if (diffDays === 0) label = "今天";
	else if (diffDays === 1) label = "明天";
	else if (diffDays === 2) label = "后天";
	else {
		// format as M月D日
		const month = d.getMonth() + 1;
		const day = d.getDate();
		label = `${month}月${day}日`;
	}

	const bgClass = diffDays === 0 ? "bg-gray-200" : "bg-gray-100";

	return (
		<span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${bgClass} text-gray-700`}>
			{label}
		</span>
	);
}

import { useState } from "react";
import useHistory from "../../../../store/useHistory";
import useStore from "../../../../store/useStore";
import { ListCheck, ScanText } from "lucide-react";
import ReviewModal from "../../../../components/ReviewModal";
import FocusModal from "../../../../components/FocusModal";

type Props = {
	date: Date;
};

function formatDateLabel(d: Date) {
	return d.toLocaleDateString(undefined, {
		weekday: "short",
		month: "short",
		day: "numeric",
	});
}

function localizedHistoryLabel(d: Date) {
	const MS_PER_DAY = 24 * 60 * 60 * 1000;
	const today = new Date();
	const toMidnight = (dt: Date) =>
		new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
	const diff = Math.round(
		(toMidnight(today).getTime() - toMidnight(d).getTime()) / MS_PER_DAY
	);

	if (diff === 0) {
		// e.g. 8月23日 周三
		const month = d.getMonth() + 1;
		const date = d.getDate();
		const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
		const wk = weekdays[d.getDay()];
		return `${month}月${date}日 周${wk}`;
	}

	if (diff === 1) return "昨天";
	if (diff === 2) return "前天";

	return formatDateLabel(d);
}

export default function HistoryItem({ date }: Props) {
	const [showReviewModal, setShowReviewModal] = useState(false);
	const [showFocusModal, setShowFocusModal] = useState(false);
	
	// Compute isToday from the date parameter
	const today = new Date();
	const toMidnight = (dt: Date) =>
		new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
	const isToday = toMidnight(today).getTime() === toMidnight(date).getTime();
	
	const key = date.toISOString();
	const dateKey = date.toISOString().slice(0, 10);
	// subscribe to the specific history entry for this date so the component updates when history changes
	const historyEntry = useHistory((s) =>
		s.history.find((h) => h.date === dateKey)
	);
	// subscribe to the raw todos array and derive matching todos locally to avoid selector side-effects
	const allTodos = useStore((s) => s.todos);
	const todos = (historyEntry?.todoIds ?? [])
		.map((id) => allTodos.find((t) => t.id === id))
		.filter((t): t is NonNullable<typeof t> => !!t);

	const completedTodos = todos.filter(todo => todo.completed);
	const incompleteTodos = todos.filter(todo => !todo.completed);

	const toggleTodo = useStore((s) => s.toggleTodo);

	const handleReviewClick = () => {
		setShowReviewModal(true);
	};

	const handleFocusClick = () => {
		setShowFocusModal(true);
	};

	return (
		<div
			key={key}
			className={`text-xs px-2 py-1 rounded-sm ${
				isToday ? "bg-blue-50" : "bg-gray-50"
			} text-gray-800 ${isToday ? "w-96" : "w-60"} group`}
		>
			{/* Header */}
			<div className="flex items-center justify-between">
				<div
					className={`inline-block px-1 rounded-sm ${
						isToday ? "text-blue-600" : ""
					}`}
				>
					{localizedHistoryLabel(date)}
				</div>

				{/* Action Buttons - Only show for today */}
				{isToday && (
					<div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {/* Focus */}
						<button
							onClick={handleFocusClick}
							className="hover:bg-white/60 rounded p-1 group/button"
						>
							<ScanText className="w-4 h-4 text-gray-400 group-hover/button:text-blue-500" />
						</button>

            {/* Review */}
						<button
							onClick={handleReviewClick}
							className="hover:bg-white/60 rounded p-1 group/button"
						>
							<ListCheck className="w-4 h-4 text-gray-400 group-hover/button:text-blue-500" />
						</button>
					</div>
				)}
			</div>

			{/* Todos */}
			{todos && todos.length > 0 && (
				<div className="mt-1 flex flex-col gap-1">
					{todos.map((t) => (
						<div
							key={t.id}
							className={`w-full flex items-center rounded-sm px-2 py-1 text-sm bg-white/80 ${
								t.completed
									? "line-through text-gray-400 opacity-60"
									: "text-gray-800"
							}`}
						>
							<input
								type="checkbox"
								checked={!!t.completed}
								onChange={() => toggleTodo(t.id)}
								className="mr-2"
							/>
							<span className={`truncate ${t.completed ? "line-through" : ""}`}>
								{t.title}
							</span>
						</div>
					))}
				</div>
			)}

			{/* Review Modal */}
			<ReviewModal
				open={showReviewModal}
				onClose={() => setShowReviewModal(false)}
				todos={completedTodos}
				title={`${localizedHistoryLabel(date)} - 今日复盘`}
			/>

			{/* Focus Modal */}
			<FocusModal
				open={showFocusModal}
				onClose={() => setShowFocusModal(false)}
				todos={incompleteTodos}
				title={`${localizedHistoryLabel(date)} - 专注模式`}
			/>
		</div>
	);
}

import { CalendarPlus, CalendarMinus, Trash2, Info } from "lucide-react";
import { Todo as TodoType } from "../../../../../types/todo";

type Props = {
	todo: TodoType;
	inToday: boolean;
	onCalendarMinusClick?: (id: string) => void;
	onCalendarPlusClick?: (id: string) => void;
	onTrashClick?: (id: string) => void;
	onInfoClick?: (id: string) => void;
};

export default function TodoOverlay({
	todo,
	inToday,
	onCalendarMinusClick,
	onCalendarPlusClick,
	onTrashClick,
	onInfoClick,
}: Props) {
	return (
		<div className="absolute inset-0 flex items-center justify-center rounded-sm bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
			<div className="flex items-center gap-2">
				{inToday ? (
					<span title="从今日移除">
						<CalendarMinus
							className="w-4 h-4 cursor-pointer text-gray-600 hover:text-blue-600"
							aria-label="remove from calendar"
							onClick={(e) => {
								e.stopPropagation();
								if (typeof onCalendarMinusClick === "function")
									onCalendarMinusClick(todo.id);
							}}
						/>
					</span>
				) : (
					<span title="加入今日">
						<CalendarPlus
							className="w-4 h-4 cursor-pointer text-gray-600 hover:text-blue-600"
							aria-label="open calendar"
							onClick={(e) => {
								e.stopPropagation();
								if (typeof onCalendarPlusClick === "function")
									onCalendarPlusClick(todo.id);
							}}
						/>
					</span>
				)}

				<span title="删除任务">
					<Trash2
						className="w-4 h-4 cursor-pointer text-gray-600 hover:text-red-600"
						aria-label="remove todo"
						onClick={(e) => {
							e.stopPropagation();
							if (typeof onTrashClick === "function") onTrashClick(todo.id);
						}}
					/>
				</span>

				<span title="查看详情">
					<Info
						className="w-4 h-4 cursor-pointer text-gray-600 hover:text-blue-600"
						aria-label="todo info"
						onClick={(e) => {
							e.stopPropagation();
							if (typeof onInfoClick === "function") onInfoClick(todo.id);
						}}
					/>
				</span>
			</div>
		</div>
	);
}

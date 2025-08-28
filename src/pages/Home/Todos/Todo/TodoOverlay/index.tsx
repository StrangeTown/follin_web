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
					<CalendarMinus
						className="w-4 h-4 cursor-pointer text-gray-600 hover:text-blue-600"
						aria-label="remove from calendar"
						onClick={(e) => {
							e.stopPropagation();
							if (typeof onCalendarMinusClick === "function")
								onCalendarMinusClick(todo.id);
						}}
					/>
				) : (
					<CalendarPlus
						className="w-4 h-4 cursor-pointer text-gray-600 hover:text-blue-600"
						aria-label="open calendar"
						onClick={(e) => {
							e.stopPropagation();
							if (typeof onCalendarPlusClick === "function")
								onCalendarPlusClick(todo.id);
						}}
					/>
				)}

				<Trash2
					className="w-4 h-4 cursor-pointer text-gray-600 hover:text-red-600"
					aria-label="remove todo"
					onClick={(e) => {
						e.stopPropagation();
						if (typeof onTrashClick === "function") onTrashClick(todo.id);
					}}
				/>

				<Info
					className="w-4 h-4 cursor-pointer text-gray-600 hover:text-blue-600"
					aria-label="todo info"
					onClick={(e) => {
						e.stopPropagation();
						if (typeof onInfoClick === "function") onInfoClick(todo.id);
					}}
				/>
			</div>
		</div>
	);
}

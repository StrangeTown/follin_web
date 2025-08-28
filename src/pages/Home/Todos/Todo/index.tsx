import { CalendarPlus, CalendarMinus, Trash2, Info } from "lucide-react";
import { Todo as TodoType } from "../../../../types/todo";
import useStore from "../../../../store/useStore";
import Confirm from "../../../../components/Confirm";
import TodoDetailModal from "../../../../components/TodoDetailModal";
import { useState } from "react";

type Props = {
	todo: TodoType;
	inToday: boolean;
	todayKey: string;
	addTodoToDate: (date: string, id: string) => void;
	removeTodoFromDate: (date: string, id: string) => void;
};

export default function TodoItem({
	todo,
	inToday,
	todayKey,
	addTodoToDate,
	removeTodoFromDate,
}: Props) {
	const removeTodo = useStore((s) => s.removeTodo);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [pendingRemoveId, setPendingRemoveId] = useState<string | null>(null);
	const [detailOpen, setDetailOpen] = useState(false);

	return (
		<div
			className={`inline-flex items-center rounded-sm px-3 py-1 text-sm bg-white/80 ${
				inToday ? "border-b border-blue-200" : "border-b border-gray-200"
			} group relative`}
		>
			<span
				className={`block px-1 truncate ${
					inToday ? "text-blue-600 opacity-40" : "text-gray-800"
				}`}
			>
				{todo.title}
			</span>

			{/* overlay shown on hover: calendar, trash, info */}
			<div className="absolute inset-0 flex items-center justify-center rounded-sm bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
				<div className="flex items-center gap-2">
					{inToday ? (
						<CalendarMinus
							className="w-4 h-4 cursor-pointer text-gray-600 hover:text-blue-600"
							aria-label="remove from calendar"
							onClick={(e) => {
								e.stopPropagation();
								removeTodoFromDate(todayKey, todo.id);
							}}
						/>
					) : (
						<CalendarPlus
							className="w-4 h-4 cursor-pointer text-gray-600 hover:text-blue-600"
							aria-label="open calendar"
							onClick={(e) => {
								e.stopPropagation();
								addTodoToDate(todayKey, todo.id);
							}}
						/>
					)}

					<Trash2
						className="w-4 h-4 cursor-pointer text-gray-600 hover:text-red-600"
						aria-label="remove todo"
						onClick={(e) => {
							e.stopPropagation();
							// open confirm modal to delete
							setPendingRemoveId(todo.id);
							setConfirmOpen(true);
						}}
					/>

					<Info
						className="w-4 h-4 cursor-pointer text-gray-600 hover:text-blue-600"
						aria-label="todo info"
						onClick={(e) => {
							e.stopPropagation();
							setDetailOpen(true);
						}}
					/>
				</div>
			</div>

			<Confirm
				open={confirmOpen}
				title="Delete todo"
				message="Are you sure you want to delete this todo?"
				onCancel={() => {
					setConfirmOpen(false);
					setPendingRemoveId(null);
				}}
				onConfirm={() => {
					if (pendingRemoveId) removeTodo(pendingRemoveId);
					setConfirmOpen(false);
					setPendingRemoveId(null);
				}}
			/>

			<TodoDetailModal
				open={detailOpen}
				todo={todo}
				onClose={() => setDetailOpen(false)}
			/>
		</div>
	);
}

import { Todo as TodoType } from "../../../../types/todo";
import TodoOverlay from "./TodoOverlay";
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
			className={`inline-flex items-center rounded-sm px-3 py-1 text-sm bg-white/80 min-w-20 ${
				inToday ? "border-b border-blue-200" : "border-b border-gray-200"
			} group relative`}
		>
			<span
				className={`flex-1 text-center px-1 truncate ${
					inToday ? "text-blue-600 opacity-40" : "text-gray-800"
				}`}
			>
				{todo.title}
			</span>

			<TodoOverlay
				todo={todo}
				inToday={inToday}
				onCalendarMinusClick={(id) => removeTodoFromDate(todayKey, id)}
				onCalendarPlusClick={(id) => addTodoToDate(todayKey, id)}
				onTrashClick={(id) => {
					setPendingRemoveId(id);
					setConfirmOpen(true);
				}}
				onInfoClick={() => setDetailOpen(true)}
			/>

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

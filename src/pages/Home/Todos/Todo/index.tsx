import { CalendarPlus, CalendarMinus } from "lucide-react";
import { Todo as TodoType } from "../../../../types/todo";
import { useState, useEffect } from "react";
import useStore from "../../../../store/useStore";

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
	const [menuOpen, setMenuOpen] = useState(false);
	const [menuPos, setMenuPos] = useState<{ x: number; y: number }>({
		x: 0,
		y: 0,
	});

	useEffect(() => {
		if (!menuOpen) return;
		function onClick() {
			setMenuOpen(false);
		}
		window.addEventListener("click", onClick);
		return () => window.removeEventListener("click", onClick);
	}, [menuOpen]);

	return (
		<div
			className={`inline-flex items-center rounded-sm px-3 py-1 text-sm bg-white/80 border-b border-gray-200 ${
				todo.completed ? "line-through text-gray-400" : "text-gray-800"
			} ${inToday ? "opacity-30" : ""} group cursor-pointer relative`}
			onClick={() =>
				inToday
					? removeTodoFromDate(todayKey, todo.id)
					: addTodoToDate(todayKey, todo.id)
			}
			onContextMenu={(e) => {
				e.preventDefault();
				setMenuPos({ x: e.clientX, y: e.clientY });
				setMenuOpen(true);
			}}
		>
			<span className="block px-1">{todo.title}</span>

			{/* overlay shown on hover */}
			<div className="absolute inset-0 flex items-center justify-center rounded-sm bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
				{inToday ? (
					<CalendarMinus
						className="w-4 h-4 cursor-pointer text-gray-600"
						aria-label="remove from calendar"
					/>
				) : (
					<CalendarPlus
						className="w-4 h-4 cursor-pointer text-gray-600"
						aria-label="open calendar"
					/>
				)}
			</div>

			{menuOpen && (
				<div
					style={{
						position: "fixed",
						left: menuPos.x,
						top: menuPos.y,
						zIndex: 60,
					}}
				>
					<div className="bg-white shadow rounded border">
						<button
							className="block px-3 py-2 text-sm w-full text-left hover:bg-gray-100"
							onClick={(ev) => {
								ev.stopPropagation();
								removeTodo(todo.id);
								setMenuOpen(false);
							}}
						>
							Remove
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

import { Todo } from "../types/todo";
import { useEffect, useState } from "react";
import { Info, X, Save, Trash2 } from "lucide-react";
import Confirm from "./Confirm";
import useStore from "../store/useStore";

type Props = {
	open: boolean;
	todo: Todo | null;
	onClose: () => void;
};

function formatTime(ts?: Date | number) {
	if (!ts) return "unknown";
	if (ts instanceof Date) return ts.toLocaleString();
	return new Date(ts).toLocaleString();
}

export default function TodoDetailModal({ open, todo, onClose }: Props) {
	const [title, setTitle] = useState<string>("");
	const [confirmOpen, setConfirmOpen] = useState(false);
	const removeTodo = useStore((s) => s.removeTodo);
	const updateTodo = useStore((s) => s.updateTodo);

	useEffect(() => {
		if (open && todo) setTitle(todo.title);
	}, [open, todo]);

	if (!open || !todo) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />

			<div className="relative bg-white rounded shadow-lg w-full max-w-md mx-4 p-6 z-10">
				<div className="mb-6">
					<Info className="w-4 h-4 text-blue-600" aria-label="info" />
				</div>

				<div className="mb-12">
					<input
						className="w-full border-b px-1 py-1 rounded outline-none"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>

				<div className="flex items-center justify-between mb-4">
					{/* Created At */}
					<div className="text-xs text-gray-500">
						<span className="mr-3">创建于</span>
						<span className="text-gray-400 text-xs">
							{formatTime(todo.createdAt)}
						</span>
					</div>

					{/* Actions */}
					<div className="flex items-center gap-4">
						{title !== todo.title && (
							<Save
								className="w-4 h-4 text-gray-600 cursor-pointer hover:text-green-600"
								aria-label="save"
								onClick={() => {
									const newTitle = title.trim()
									if (newTitle === '') return
									if (todo) updateTodo(todo.id, { title: newTitle })
									onClose()
								}}
							/>
						)}
						<Trash2
							className="w-4 h-4 text-gray-600 cursor-pointer hover:text-red-600"
							aria-label="delete"
							onClick={() => setConfirmOpen(true)}
						/>
						<X
							className="w-4 h-4 text-gray-600 cursor-pointer hover:text-gray-800"
							aria-label="close"
							onClick={onClose}
						/>
					</div>
				</div>
			</div>

			<Confirm
				open={confirmOpen}
				title="Delete todo"
				message="Are you sure you want to delete this todo?"
				onCancel={() => setConfirmOpen(false)}
				onConfirm={() => {
					if (todo) removeTodo(todo.id);
					setConfirmOpen(false);
					onClose();
				}}
			/>
		</div>
	);
}

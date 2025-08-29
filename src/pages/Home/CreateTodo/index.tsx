import { useState } from "react";
import { CirclePlus } from "lucide-react";
import CreateTodoModal from "../../../components/CreateTodoModal";
import useStore from "../../../store/useStore";

export default function CreateTodo() {
	const [open, setOpen] = useState(false);

	const addTodo = useStore((s) => s.addTodo);

	function handleCreate(title: string, scheduledDate?: Date) {
		addTodo({ title, scheduledDate });
	}

	return (
		<div>
			<button
				onClick={() => setOpen(true)}
				aria-label="新建任务"
				title="新建任务"
				className="p-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
			>
				<CirclePlus className="w-4 h-4" />
			</button>

			<CreateTodoModal
				open={open}
				onClose={() => setOpen(false)}
				onCreate={handleCreate}
			/>
		</div>
	);
}

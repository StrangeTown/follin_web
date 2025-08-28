import { useState, useRef, useEffect } from "react";

type Props = {
	open: boolean;
	onClose: () => void;
	onCreate: (title: string) => void;
};

export default function CreateTodoModal({ open, onClose, onCreate }: Props) {
	const [title, setTitle] = useState("");
	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (open) {
			// focus the input when modal becomes visible
			setTimeout(() => inputRef.current?.focus(), 0);
		}
	}, [open]);

	if (!open) return null;

	function submit() {
		const value = title.trim();
		if (!value) return;
		onCreate(value);
		setTitle("");
		onClose();
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />

			<div className="relative bg-white rounded shadow-lg w-full max-w-lg mx-4 p-6 z-10">
				<h2 className="text-lg font-semibold mb-3">Create</h2>

				<label className="block">
					<input
						className="mt-1 block w-full rounded px-1 py-2 outline-none border-b border-gray-300"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						ref={inputRef}
						onKeyDown={(e) => {
							if (e.key === "Enter") submit();
						}}
						placeholder="Enter a todo title"
					/>
				</label>

				<div className="mt-4 flex justify-end gap-2">
					<button
						onClick={onClose}
						className="px-4 py-2 rounded-md text-sm text-gray-700 border border-gray-200 bg-white hover:bg-gray-50 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-200"
					>
						Cancel
					</button>
					<button
						onClick={submit}
						className="px-4 py-2 rounded-md text-sm text-white bg-blue-600 hover:bg-blue-650 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-300"
					>
						Create
					</button>
				</div>
			</div>
		</div>
	);
}

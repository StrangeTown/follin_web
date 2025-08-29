type Props = {
	open: boolean;
	title?: string;
	message?: string;
	onConfirm: () => void;
	onCancel: () => void;
};

export default function Confirm({
	open,
	title = "确认",
	message = "确定吗？",
	onConfirm,
	onCancel,
}: Props) {
	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div
				className="absolute inset-0 bg-black opacity-50"
				onClick={onCancel}
			/>

			<div className="relative bg-white rounded shadow-lg w-full max-w-sm mx-4 p-4 z-10">
				<h3 className="text-lg font-semibold mb-2">{title}</h3>
				<p className="text-sm text-gray-700 mb-4">{message}</p>

				<div className="flex justify-end gap-2">
					<button
						className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
						onClick={onCancel}
					>
						取消
					</button>
					<button
						className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
						onClick={onConfirm}
					>
						确认
					</button>
				</div>
			</div>
		</div>
	);
}

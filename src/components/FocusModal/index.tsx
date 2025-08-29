import { X, Play, Pause, Square } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Todo } from "../../types/todo";
import useStore from "../../store/useStore";

type Props = {
	open: boolean;
	onClose: () => void;
	todos: Todo[];
	title?: string;
};

export default function FocusModal({
	open,
	onClose,
	todos,
	title = "专注今日",
}: Props) {
	const toggleTodo = useStore((state) => state.toggleTodo);
	const [activeItemIndex, setActiveItemIndex] = useState(0);
	const [isTimerRunning, setIsTimerRunning] = useState(false);
	const [elapsedTime, setElapsedTime] = useState(0); // in seconds
	const intervalRef = useRef<number | null>(null);

	// Timer logic
	useEffect(() => {
		if (isTimerRunning) {
			intervalRef.current = window.setInterval(() => {
				setElapsedTime(prev => prev + 1);
			}, 1000);
		} else {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [isTimerRunning]);

	// Reset timer when active item changes
	useEffect(() => {
		resetTimer();
	}, [activeItemIndex]);

	// Format time as MM:SS
	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	};

	const startTimer = () => setIsTimerRunning(true);
	const stopTimer = () => setIsTimerRunning(false);
	const resetTimer = () => {
		setIsTimerRunning(false);
		setElapsedTime(0);
	};

	if (!open) return null;

	const formatDate = (date?: Date | string) => {
		if (!date) return "";

		// Convert to Date object if it's a string
		const dateObj = typeof date === "string" ? new Date(date) : date;

		// Check if the date is valid
		if (isNaN(dateObj.getTime())) return "";

		return new Intl.DateTimeFormat("zh-CN", {
			month: "numeric",
			day: "numeric",
			weekday: "short",
		}).format(dateObj);
	};

	return (
		// Modal Background
		<div
			className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
			onClick={onClose}
		>
			{/* Modal Container */}
			<div
				className="bg-white rounded-lg w-full h-full max-w-4xl max-h-[90vh] flex flex-col shadow-xl"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-200">
					<h2 className="text-xl font-semibold text-gray-300">{title}</h2>
					<button
						onClick={onClose}
						className="p-2 hover:bg-gray-100 rounded-full transition-colors"
					>
						<X className="w-5 h-5 text-gray-500" />
					</button>
				</div>

				{/* Content */}
				<div className="flex-1 flex overflow-hidden">
					{todos.length === 0 ? (
						<div className="flex-1 flex items-center justify-center">
							<div className="text-center text-gray-500">
								<p className="text-lg">No todos for focus session</p>
								<p className="text-sm mt-2">Add some todos to start focusing</p>
							</div>
						</div>
					) : (
						<>
							{/* Left Side - Todo List */}
							<div className="w-1/3 border-r border-gray-200 overflow-y-auto p-6">
								<div className="space-y-2">
									{todos.map((todo, index) => (
										<div
											key={todo.id}
											onClick={() => setActiveItemIndex(index)}
											className={`px-3 py-2 border-b transition-colors cursor-pointer ${
												activeItemIndex === index
													? " border-blue-300"
													: "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50"
											}`}
										>
											<div className="flex items-center space-x-2">
												<p className="text-sm truncate text-gray-500">
													{todo.title}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Right Side - Focus Item Details */}
							<div className="flex-1 overflow-y-auto p-12">
								{todos[activeItemIndex] && (
									<div>
										<div className="bg-white">
											<div className="flex items-start space-x-3">
												<Square
													className={`w-5 h-5 cursor-pointer mt-1 flex-shrink-0 ${
														todos[activeItemIndex].completed
															? "text-blue-600 fill-blue-600"
															: "text-gray-400"
													}`}
													onClick={() => {
														toggleTodo(todos[activeItemIndex].id);
														resetTimer();
													}}
												/>
												<div className="flex-1">
													<h4
														className={`text-lg font-medium mb-3 ${
															todos[activeItemIndex].completed
																? "text-gray-500 line-through"
																: "text-gray-900"
														}`}
													>
														{todos[activeItemIndex].title}
													</h4>

													{/* Timer Section */}
													<div className="mb-6 p-4 bg-gray-50 rounded-lg">
														<div className="flex items-center justify-between">
															<div className="flex items-center space-x-4">
																<div className="text-2xl font-mono font-bold text-gray-900">
																	{formatTime(elapsedTime)}
																</div>
																<div className="flex items-center space-x-2">
																	<button
																		onClick={isTimerRunning ? stopTimer : startTimer}
																		className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
																	>
																		{isTimerRunning ? (
																			<Pause className="w-4 h-4" />
																		) : (
																			<Play className="w-4 h-4" />
																		)}
																	</button>
																	<button
																		onClick={resetTimer}
																		className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition-colors"
																	>
																		Reset
																	</button>
																</div>
															</div>
														</div>
													</div>

													{todos[activeItemIndex].scheduledDate && (
														<div className="mb-4">
															<p className="text-sm text-gray-600">
																<span className="font-medium">Scheduled:</span>{" "}
																{formatDate(
																	todos[activeItemIndex].scheduledDate
																)}
															</p>
														</div>
													)}

													{todos[activeItemIndex].tags &&
														todos[activeItemIndex].tags.length > 0 && (
															<div className="mb-4">
																<p className="text-sm font-medium text-gray-600 mb-2">
																	Tags:
																</p>
																<div className="flex flex-wrap gap-2">
																	{todos[activeItemIndex].tags.map((tag) => (
																		<span
																			key={tag.id}
																			className="px-3 py-1 text-sm rounded-full"
																			style={{
																				backgroundColor: tag.color + "20",
																				color: tag.color,
																			}}
																		>
																			{tag.name}
																		</span>
																	))}
																</div>
															</div>
														)}

													{todos[activeItemIndex].createdAt && (
														<div className="text-xs text-gray-300">
															创建于:{" "}
															{formatDate(todos[activeItemIndex].createdAt)}
														</div>
													)}
												</div>
											</div>
										</div>
									</div>
								)}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

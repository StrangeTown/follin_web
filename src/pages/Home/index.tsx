import CreateTodo from "./CreateTodo";
// import CreateToday from "./CreateToday";
import Todos from "./Todos";
import History from "./History";

export default function Home() {
	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center gap-2">
				{/* <CreateToday /> */}
				<CreateTodo />
			</div>

			<History />

			<Todos />
		</div>
	);
}

// import CreateToday from "./CreateToday";
import Todos from "./Todos";
import History from "./History";

export default function Home() {
	return (
		<div className="p-6 space-y-6">
			<History />

			<Todos />
		</div>
	);
}

import BoardOneContainer from "../../../components/BoardContainer/BoardOneContainer/BoardOneContainer"
import { useParams } from "react-router-dom"

function BoardOnePage() {
	let { boardSeq } = useParams();

	return (
		<div>
			<BoardOneContainer boardSeq={boardSeq}/>
		</div>
	)
}

export default BoardOnePage

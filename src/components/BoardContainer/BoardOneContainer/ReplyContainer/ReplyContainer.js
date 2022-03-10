import { useEffect, useState } from "react"
import { getBoardOne } from "../../../../api/BoardQuery"
import { replyDelete } from "../../../../api/BoardCommand"

function ReplyContainer(reply) {

    const [replyData, setReplyData] = useState("")

    useEffect(() => {
        setReplyData(reply.reply)
      },[])

    return (
		<div>
            <table>
                <tr>
                    <td>작성자 : {replyData.memberEmail}</td>
                    <td>마지막 작성일 : {replyData.updateData}</td>
                    <td>글번호 : {replyData.seq}</td>
                </tr>
                <tr>
                <td>
                    <div><p>{replyData.content}</p></div>
                </td>
            </tr>
            </table>
		</div>
    )
}   

export default ReplyContainer
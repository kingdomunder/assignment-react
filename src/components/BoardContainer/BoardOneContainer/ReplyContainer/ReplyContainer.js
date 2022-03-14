import * as React from 'react';
import { useEffect, useState } from "react"
import { getBoardOne } from "../../../../api/BoardQuery"
import { replyDelete } from "../../../../api/BoardCommand"
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

function ReplyContainer(replies) {

    const [replyList, setReplyList] = useState([])

    const preventDefault = (event) => {
		event.preventDefault();
	}

    return (
        <React.Fragment>
        <Table size="small">
          <TableBody>
            {replies.replies.map(reply => (
                <div>
                    {reply.content}
                    <TableRow key={reply.seq}>
                        <TableCell>{reply.memberEmail}</TableCell>
                        <TableCell>{reply.updateDate}</TableCell>
                    </TableRow>
                    <br /> <br />
                </div>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    )
}   

export default ReplyContainer
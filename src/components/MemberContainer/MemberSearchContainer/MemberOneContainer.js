function MemberOneContainer(memberOneData) {
    return(
        <div>
            <table>
                <tr>
                    <th>SEQ</th>
                    <th>TITLE</th>
                    <th>EMAIL</th>
                    <th>AUTH</th>
                </tr>  
                <tr>
                    <td>{memberOneData.memberOneData.seq}</td>
                    <td>{memberOneData.memberOneData.email}</td>
                    <td>{memberOneData.memberOneData.name}</td>
                    <td>{memberOneData.memberOneData.authority}</td>
                </tr>  
            </table>
        </div>
    )
}

export default MemberOneContainer
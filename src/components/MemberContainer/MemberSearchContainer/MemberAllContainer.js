function MemberAllContainer(memberAllData) {
    return(
        <div>
            <table>
                <tr>
                    <th>SEQ</th>
                    <th>TITLE</th>
                    <th>EMAIL</th>
                    <th>AUTH</th>
                </tr>  
                {memberAllData.memberAllData.map(member =>
                <tr>
                    <td>{member.seq}</td>
                    <td>{member.email}</td>
                    <td>{member.name}</td>
                    <td>{member.authority}</td>
                </tr>  
                )}
            </table>
        </div>
    )
}

export default MemberAllContainer
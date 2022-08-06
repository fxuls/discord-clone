const ServerCard = ({ server }) => {
    return <div className="server-card">
        <img className="server-icon" src={server.server_image_url}/>
    </div>
}

export default ServerCard;

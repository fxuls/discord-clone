import { useEffect } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { joinServerByUrl, fetchServer } from "../store/servers";
import { setServer } from "../store/ui";

const JoinServerPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const inviteUrl = location.pathname.split("/").at(-1);

    useEffect(async () => {
        const response = await dispatch(joinServerByUrl(inviteUrl));
        if (response.id) {
            await dispatch(fetchServer(response.id));
        }
    }, []);

    return <Redirect to="/app" />;
}

export default JoinServerPage;

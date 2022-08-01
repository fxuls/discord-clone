import { Route } from "react-router-dom"
import SignOutButton from "./auth/SignOutButton"

const AuthenticatedApp = () => {
    return <div>
        <SignOutButton />
        <Route path="/servers">Servers</Route>
        <Route path="/" exact={true}>Authenticated app</Route>
    </div>
}

export default AuthenticatedApp

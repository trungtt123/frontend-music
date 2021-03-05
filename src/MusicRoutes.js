import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import  Home  from "./components/Home";
function MusicRoutes() {
    let { path } = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route component={Home} path={`${path}`} />
            </Switch>
        </div>
    );
}
export default MusicRoutes;
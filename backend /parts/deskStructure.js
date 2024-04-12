import S from "@sanity/desk-tool/structure-builder"

import {home} from "../desk/home"
import {pages} from "../desk/pages"
import {settings} from "../desk/settings"
import {locations} from "../desk/locations"
import {team} from "../desk/team"
import {services} from "../desk/services"

export default () => {
    return S.list()
        .title("Content")
        .items([
            home,
            services,
            team,
            pages,
            S.divider(),
            settings,
            locations
        ])
}

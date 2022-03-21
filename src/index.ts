import Api from "./api"

function IdcClient(apikey: string) {
    return new Api(apikey)
}

export default IdcClient
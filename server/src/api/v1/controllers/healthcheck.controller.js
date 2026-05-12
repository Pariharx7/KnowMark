const healthcheck = async(req, res) => {
    res.send("app health is fine");
}

export {
    healthcheck
}
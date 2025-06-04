class Controller {
    static async X(req, res){
        try {
            res.send("ini X");
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller;
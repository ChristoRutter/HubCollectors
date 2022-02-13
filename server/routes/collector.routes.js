    const CollectController = require("../controllers/collector.controller");
    const {authenticate} = require("../config/jwt.config");
    
    module.exports = (app) => {
    
        app.get("/api/collectors", CollectController.findAllCollector);
    
        app.post("/api/collectors", authenticate, CollectController.createNewCollector);
    
        app.get("/api/collecotrsbyuser/:username", authenticate, CollectController.findAllCollectorsByUser);
    
    
        app.get("/api/collectors/:id", CollectController.findOneCollector); 
    
        app.delete("/api/collectors/:id", CollectController.deleteCollector);
        app.put("/api/collectors/:id", CollectController.updateCollector);
    
    
    }
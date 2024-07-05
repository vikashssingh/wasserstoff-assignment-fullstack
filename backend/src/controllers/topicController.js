const topicModel = require('../models/topicModel')

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};



/*########################################## Add Topic ############################################*/

let addTopic = async (req, res) => {
    try {
        let data = req.body;
        data.userId = req.params.userId
        let { topic, description } = data;

        //----------------------------- Validating body -----------------------------//
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Please Provide topic Details" });
        }

        //----------------------------- Validating topic -----------------------------//
        if (!isValid(topic)) {
            return res.status(400).send({ status: false, message: "topic is required" });
        }

        //----------------------------- Validating description -----------------------------//
        if (!isValid(description)) {
            return res.status(400).send({ status: false, message: "description is required" });
        }

        //----------------------------- Creating topic -----------------------------//
        const topicAdded = await topicModel.create(data)
        return res.status(201).send({ status: true, message: "Topic added Successfully", data: topicAdded })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
};




/*############################################ dashboard ################################################*/


let dashboard = async (req, res) => {
    try {
        const topic = await topicModel.find({ userId: req.params.userId })
        return res.status(200).send({ status: true, message: "Topic details: ", data: topic });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}





module.exports = { addTopic, dashboard };


const createUser = ({ name = "", color = "" } = {}) => (
    {
        name,
        color
    }
)

const createMessage = ({ message = "", sender = "" } = {}) => (
    {
        message,
        sender,
        timeSent: new Date(Date.now())
    }
)

const createRoom = ({ messages: [], name = "General", users = [] } = {}) => (
    {
        messages,
        name,
        users
    }
)

module.exports = { createUser, createMessage, createRoom };
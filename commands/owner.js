module.exports = {
    name: 'owner',
    description: 'own',
    usage: "no u",
    cooldown: 5,
    execute(message, args) {
        console.log(message.author.id);
    },
};

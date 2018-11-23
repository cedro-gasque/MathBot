module.exports = {
    name: 'accept',
    description: 'Either join an open game, join a game with a password, or accept a direct challenge!',
    aliases: ['join'],
    usage: "<gameID> [password]",
    cooldown: 5,
    args: true,
    chess: true,
    execute(message, args, chess) {
        let allowed = chess.accept(message.author.id, args[1] || "", args[0]);
        if (allowed) {
            message.channel.send(`Successfully joined game ${args[0]}`);
        }
        else {
            message.channel.send(`Can't join game!`);
        }
    }
};

module.exports = {
    name: 'decline',
    description: 'Decline a direct challenge!',
    aliases: ['deny'],
    usage: "<gameID>",
    cooldown: 5,
    args: true,
    chess: true,
    execute(message, args, chess) {
        let allowed = chess.decline(message.author.id, args[0]);
        if (allowed) {
            message.channel.send(`Successfully declined game ${args[0]}`);
        }
        else {
            message.channel.send(`That's not for you!`);
        }
    }
};

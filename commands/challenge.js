const reg = /<@\d+>/g;
module.exports = {
    name: 'challenge',
    description: 'Challenge another member to a game of chess, or open a game that anyone can join. \n If it\'s an open game, you may set a password.',
    usage: "{ mention | [password] }",
    cooldown: 5,
    chess: true,
    execute(message, args, chess) {
        if (args.length) {
            if (reg.test(args[0])) {
                let id = chess.challenge("", message.author_id, args[0].substring(2, args[0].length - 1));
                if (id === -1) {
                    message.channel.send(`Challenge list is full! There is a maximum of ${chess.maxGames} games and challenges open at one time!`);
                }
                else if (id === -2) {
                    message.channel.send('You already have a challenge open!');
                }
                else message.channel.send(`You've challenged ${args[0]} to a game!`);
            }
            else {
                let id = chess.challenge(args[0], message.author_id);
                if (id === -1) {
                    message.channel.send(`Challenge list is full! There is a maximum of ${chess.maxGames} games and challenges open at one time!`);
                }
                else message.channel.send(`You've created a game with a password!`)
                    .then(() => message.delete())
                    .then(() => console.log("Password message successfully deleted!"));
            }
        }
        else {
            let id = chess.challenge("", message.author_id);
            if (id === -1) {
                message.channel.send(`Challenge list is full! There is a maximum of ${chess.maxGames} games and challenges open at one time!`);
            }
            else message.channel.send(`You've created an open game!`);
        }
    }
};

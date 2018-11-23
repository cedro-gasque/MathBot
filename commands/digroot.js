function digitalRoot (number) {
    let s = Math.abs(Math.floor(number)).toString().split("");
    if (s.length > 1) {
        let count = 0;
        for (var i = 0; i < s.length; i++) {
            count += +s[i];
        }
        return digitalRoot(count);
    } else {
        return number;
    }
}
module.exports = {
    name: 'digroot',
    description: 'Returns the digital root of an integer.',
    args: true,
    usage: "<integer>",
    cooldown: 5,
    execute(message, args) {
        const number = +args[0];
        if (!isNaN(number)) {
            message.channel.send(`The digital root of ${number} is ${digitalRoot(number)}`);
        } else {
            message.channel.send("That's not a number!");
        }
    },
};
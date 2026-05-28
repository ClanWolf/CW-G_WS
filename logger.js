const pino = require('pino');

// Set up the logger
const logger = pino({
	level: 'info',
	transport: {
		targets: [
			{
				target: 'pino-pretty',
				options: {
					colorize: false
				}
			},
			{
				target: 'pino-roll',
				options: {
					file: './public/log/gateway_logfile.txt',
					mkdir: true,
					size: '5m',
					limit: {
						count: 5
					}
				}
			},
			// https://github.com/pinojs/pino-toke
//			{
//				target: 'pino-toke',
//				level: 'info',
//				options: {
//					destination: 1, // optional (default stdout)
//					ancellary: 2, // optional
//					format: ':method :url :status :res[content-length] - :response-time ms', // required
//					keep: false // optional
//				}
//			}
		]
	}
});

module.exports = { logger, };

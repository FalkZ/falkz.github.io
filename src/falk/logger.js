import log from 'log-with-style'

export default function() {
	this.getPromise().then(() => {
		log(
			`[c="font-family: Lato, sans-serif; font-size: 30px; color: #3366CC; font-weight: bold; margin-right:2px"]${this
				.name}[c]@falkAPI `
		)

		this.state.map((content, index) => {
			log(
				`[c="font-family: Roboto, sans-serif; font-size: 20px; color: #3366CC;  padding: 3px 0; "]▼ ${index} ${this
					.action[index]} [c]`
			)
			if (typeof this.error !== 'undefined') {
				if (typeof this.error[index] !== 'undefined') {
					log(
						`[c="font-family: Roboto, sans-serif; font-size: 15px;  font-weight: bold; color: white; background: #FD0E35; padding: 1px; border-radius: 3px;  "] ⚠ ${this
							.error[index].type} [c]`
					)
					console.dir(this.error[index].cause)
				}
			} else {
				console.dir(content)
			}
			return null
		})
	})

	return this
}

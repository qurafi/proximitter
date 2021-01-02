class Proximitter {
	constructor() {
		this.evs = {};

		return new Proxy(this, {
			set(t, ev, v) {
				const isOnce = ev.startsWith("once");

				if (isOnce || ev.startsWith("on")) {
					if (typeof v != "function") {
						throw new TypeError(
							"Expected handler to be a function"
						);
					}

					t[isOnce ? "once" : "on"](ev.slice(isOnce ? 4 : 2), v);
				}
			},
		});
	}

	on(ev, cb, n = Infinity) {
		if (!this.evs[ev]) this.evs[ev] = [];

		this.evs[ev].push({ cb, n });
	}

	once(ev, cb) {
		this.on(ev, cb, 1);
	}

	off(ev, cb) {
		if (!this.evs[ev]) return;

		if (typeof cb == "function") {
			const i = this.evs[ev].findIndex((v) => v.cb === cb);
			if (i >= 0) this.evs[ev].splice(i, 1);
		} else if (cb == undefined) {
			this.evs[ev] = [];
		}
	}

	emit(ev, ...args) {
		const evs = this.evs[ev];
		if (!evs) return;

		evs.forEach((e) => {
			if (e.n > 0) {
				e.cb.apply(this, args);
				e.n--;

				if (e.n == 0) this.off(ev, e.cb);
			}
		});
	}
}

module.exports = Proximitter;

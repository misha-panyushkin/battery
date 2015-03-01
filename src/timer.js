function timer () {
	timer.timeout = setTimeout(function () {
		var queue_map = {chargers:[], unchargers:[]};

		this.connections.reduce(function (memo, connection) {
			connection.charger && memo.chargers.push(connection.charger);
			connection.uncharger && memo.unchargers.push(connection.uncharger);
			return memo;
		}, queue_map);

		queue_map.chargers.forEach(function (chargerHandler) {
			chargerHandler.call(null, charger.bind(this));
		}.bind(this));
		
		queue_map.unchargers.forEach(function (unchargerHandler) {
			unchargerHandler.call(null, uncharger.bind(this));
		}.bind(this));

		if (this.lifetime) {
			this.lifetime -= this.timeunit;
			if (this.lifetime === 0) {
				this.wasted = 1;
				return;
			} else if (this.lifetime < 0) {
				this.timeunit = this.lifetime *= -1;
			}
		}

		timer.call(this);
	}.bind(this), this.timeunit);
}
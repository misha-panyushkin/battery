function Battery (inputs) {
	inputs = inputs || {};
	for (d in this.defaults) if (this.defaults.hasOwnProperty(d)){
		this[d] = this.defaults[d](inputs[d]);
	}
	this.connections = [];
	timer.call(this);
}

Battery.prototype.defaults = {
	wasted: function (input) {
		return parseInt(input) ? Math.abs(input) && 1 : 0;
	},
	quantity: function (input) {
		return input > 0 ? input : 0;
	},
	capacity: function (input) {
		return input > 0 ? input : 100;
	},
	lifetime: function (input) {
		return input > 0 ? input : null;
	},
	timeunit: function (input) {
		return input > 0 ? input : 1000;
	}
};

Battery.prototype.setConnection = function (chargeHandler, unchargeHandler) {
	return this.connections.push({
		id: this.connections.length,
		charger: chargeHandler,
		uncharger: unchargeHandler
	}) - 1;
};

Battery.prototype.removeConnection = function (id) {
	this.connections.splice(id, 1);
};

c.Battery = function (inputs) {
	return new Battery(inputs);
};
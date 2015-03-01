! function (c, window) {

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


    Function.prototype.bind = Function.prototype.bind || function (context) {
        var args = Array.prototype.slice.call(arguments, 1);
        var func = this;
        return function () {
            var add_args = Array.prototype.slice.call(arguments);
            return func.apply(context, args.concat(add_args));
        }
    };


    function charger (charge) {
    	if (this.wasted) {
    		return;
    	}
    	charge = charge || 0;
    	this.quantity += charge;
    	this.quantity = this.quantity > this.capacity ? this.capacity : this.quantity;
    
    	return this.quantity;
    };


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


    function uncharger (charge) {
    	if (this.wasted) {
    		return;
    	}
    	charge = charge || 0;
    	if (this.quantity < charge) {
    		charge = this.quantity;
    		this.quantity = 0;
    	} else {
    		this.quantity -= charge;
    	}
    
    	return charge;
    };

} (this, this);
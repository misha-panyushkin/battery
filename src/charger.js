function charger (charge) {
	if (this.wasted) {
		return;
	}
	charge = charge || 0;
	this.quantity += charge;
	this.quantity = this.quantity > this.capacity ? this.capacity : this.quantity;

	return this.quantity;
};
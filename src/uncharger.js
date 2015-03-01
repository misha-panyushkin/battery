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